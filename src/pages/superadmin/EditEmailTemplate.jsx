import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import { Save, Loader2, Eye, Send, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const safeJsonArray = (value) => {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const isValidJsonArray = (value) => {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};

const extractVars = (text) => {
  const s = String(text || "");
  const regex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
  const found = new Set();
  let m;
  while ((m = regex.exec(s)) !== null) {
    found.add(m[1]);
  }
  return Array.from(found);
};

const renderVars = (html, vars) => {
  let out = String(html || "");
  Object.keys(vars || {}).forEach((k) => {
    out = out.replaceAll(`{{${k}}}`, String(vars[k] ?? ""));
    out = out.replaceAll(`{{ ${k} }}`, String(vars[k] ?? ""));
  });
  return out;
};

const EditEmailTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: "",
    slug: "",
    name: "",
    subject: "",
    body_html: "",
    status: "active",
  });

  const [variablesJson, setVariablesJson] = useState("[]");

  const [testVarsJson, setTestVarsJson] = useState(
    JSON.stringify(
      {
        name: "Vipin",
        login_url: "http://localhost:5173/login",
        email: "vipinwork@gmail.com",
        password: "12345678",
      },
      null,
      2
    )
  );

  const [previewOpen, setPreviewOpen] = useState(false);

  const [sendOpen, setSendOpen] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sending, setSending] = useState(false);

  const detectedVars = useMemo(() => {
    const all = [...extractVars(form.subject), ...extractVars(form.body_html)];
    return Array.from(new Set(all));
  }, [form.subject, form.body_html]);

  const variablesValid = isValidJsonArray(variablesJson);

  const testVarsObj = useMemo(() => {
    try {
      const parsed = JSON.parse(testVarsJson || "{}");
      return typeof parsed === "object" && parsed ? parsed : {};
    } catch {
      return {};
    }
  }, [testVarsJson]);

  const renderedSubject = useMemo(() => {
    return renderVars(form.subject, testVarsObj);
  }, [form.subject, testVarsObj]);

  const renderedBody = useMemo(() => {
    return renderVars(form.body_html, testVarsObj);
  }, [form.body_html, testVarsObj]);

  const loadTemplate = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/email-templates/get.php?id=${id}`);
      const tpl = res.data.data;

      setForm({
        id: tpl.id,
        slug: tpl.slug || "",
        name: tpl.name || "",
        subject: tpl.subject || "",
        body_html: tpl.body_html || "",
        status: tpl.status || "active",
      });

      // stored as JSON string in DB, keep editable as string
      setVariablesJson(tpl.variables_json || "[]");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to load template");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplate();
    // eslint-disable-next-line
  }, [id]);

  const saveTemplate = async () => {
    if (!form.slug.trim()) return alert("Slug required");
    if (!form.name.trim()) return alert("Template name required");
    if (!form.subject.trim()) return alert("Subject required");
    if (!form.body_html.trim()) return alert("Body HTML required");

    const slug = form.slug.trim().toLowerCase();
    if (!/^[a-z0-9\-_]+$/.test(slug)) {
      return alert("Invalid slug. Use letters, numbers, dash, underscore");
    }

    if (!variablesValid) {
      return alert("Variables JSON invalid. Must be JSON array.");
    }

    try {
      setSaving(true);

      await api.post("/email-templates/update.php", {
        id: Number(form.id),
        slug,
        name: form.name.trim(),
        subject: form.subject.trim(),
        body_html: form.body_html,
        status: form.status,
        variables_json: safeJsonArray(variablesJson),
      });

      alert("Email template updated ✅");
      navigate("/superadmin/email-templates");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const sendTestEmail = async () => {
    if (!sendTo.trim()) return alert("Enter recipient email");

    let varsObj = {};
    try {
      varsObj = JSON.parse(testVarsJson || "{}");
    } catch {
      return alert("Test Vars JSON invalid (must be object)");
    }

    try {
      setSending(true);

      await api.post("/mailer/send-template-api.php", {
        to: sendTo.trim(),
        slug: form.slug,
        vars: varsObj,
      });

      alert("Test email sent ✅");
      setSendOpen(false);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <GymLoader label="Loading email template..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader
          title="Edit Email Template"
          subtitle={`Template ID: ${id}`}
        />

        <button
          onClick={() => navigate("/superadmin/email-templates")}
          className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Template Details
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value.toLowerCase() })
                }
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Rendered: <b>{renderedSubject || "—"}</b>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Variables JSON (Array)
              </label>
              <textarea
                value={variablesJson}
                onChange={(e) => setVariablesJson(e.target.value)}
                className={`w-full min-h-[110px] px-3 py-2 rounded-xl border font-mono text-sm outline-none focus:ring-2 ${variablesValid
                    ? "border-slate-200 focus:ring-indigo-500"
                    : "border-red-300 focus:ring-red-500"
                  }`}
              />
              <p
                className={`text-xs mt-1 ${variablesValid ? "text-slate-500" : "text-red-600"
                  }`}
              >
                {variablesValid
                  ? "Valid JSON ✅"
                  : "Invalid JSON ❌ (must be array)"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setPreviewOpen(true)}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={() => setSendOpen(true)}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Test
              </button>

              <button
                onClick={saveTemplate}
                disabled={saving}
                className={`h-10 px-5 rounded-xl text-sm font-semibold flex items-center gap-2 ${saving
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              Detected Variables
            </h3>

            {detectedVars.length === 0 ? (
              <p className="text-sm text-slate-500">
                No variables found. Add like <b>{"{{name}}"}</b>
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {detectedVars.map((v) => (
                  <span
                    key={v}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Body HTML
              </h3>
              <p className="text-sm text-slate-500">
                Use variables like <b>{"{{login_url}}"}</b>
              </p>
            </div>

            <div className="p-5">
              <textarea
                value={form.body_html}
                onChange={(e) =>
                  setForm({ ...form, body_html: e.target.value })
                }
                className="w-full min-h-[420px] px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Test Variables (JSON Object)
              </h3>
              <p className="text-sm text-slate-500">
                Preview and Send Test uses this object
              </p>
            </div>

            <div className="p-5">
              <textarea
                value={testVarsJson}
                onChange={(e) => setTestVarsJson(e.target.value)}
                className="w-full min-h-[200px] px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Email Preview
                </h3>
                <p className="text-sm text-slate-500">{renderedSubject || "—"}</p>
              </div>

              <button
                onClick={() => setPreviewOpen(false)}
                className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm"
              >
                Close
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  Rendered HTML
                </div>
                <div
                  className="p-4"
                  dangerouslySetInnerHTML={{ __html: renderedBody }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEND TEST MODAL */}
      {sendOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Send Test Email
              </h3>
              <p className="text-sm text-slate-500">
                Uses template slug: <b>{form.slug || "-"}</b>
              </p>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  To Email
                </label>
                <input
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. test@gmail.com"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">Subject</p>
                <p className="text-sm font-semibold text-slate-900">
                  {renderedSubject || "-"}
                </p>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSendOpen(false)}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={sendTestEmail}
                disabled={sending}
                className={`h-10 px-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${sending
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEmailTemplate;
