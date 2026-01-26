import { useMemo, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { Save, Loader2, Eye, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultHtml = `
<div style="font-family: Arial, sans-serif; line-height:1.6;">
  <h2>Hello {{name}} 👋</h2>
  <p>This is a sample email template.</p>
  <p><b>Login:</b> {{login_url}}</p>
  <p><b>Email:</b> {{email}}</p>
  <p><b>Password:</b> {{password}}</p>
  <br/>
  <p style="color:#666;">Thanks,<br/>Team</p>
</div>
`.trim();

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

const CreateEmailTemplate = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    name: "",
    subject: "",
    body_html: defaultHtml,
    status: "active",
  });

  // variables (stored as JSON array string)
  const [variablesJson, setVariablesJson] = useState("[]");

  // test vars for preview/send
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

  // preview modal
  const [previewOpen, setPreviewOpen] = useState(false);

  // send test email modal
  const [sendOpen, setSendOpen] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sending, setSending] = useState(false);

  const detectedVars = useMemo(() => {
    const all = [
      ...extractVars(form.subject),
      ...extractVars(form.body_html),
    ];
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

  const saveTemplate = async () => {
    if (!form.slug.trim()) return alert("Slug required");
    if (!form.name.trim()) return alert("Template name required");
    if (!form.subject.trim()) return alert("Subject required");
    if (!form.body_html.trim()) return alert("Body HTML required");

    // slug validation (same as backend)
    const slug = form.slug.trim().toLowerCase();
    if (!/^[a-z0-9\-_]+$/.test(slug)) {
      return alert("Invalid slug. Use letters, numbers, dash, underscore");
    }

    if (!variablesValid) {
      return alert("Variables JSON invalid. Must be a JSON array.");
    }

    try {
      setSaving(true);

      await api.post("/email-templates/create.php", {
        slug,
        name: form.name.trim(),
        subject: form.subject.trim(),
        body_html: form.body_html,
        status: form.status,
        variables_json: safeJsonArray(variablesJson),
      });

      alert("Email template created ✅");
      navigate("/superadmin/email-templates");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  const openPreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => setPreviewOpen(false);

  const openSendTest = () => {
    if (!form.slug.trim()) {
      alert("Please enter slug first (template slug is required for sending).");
      return;
    }
    setSendOpen(true);
  };

  const closeSendTest = () => setSendOpen(false);

  const sendTestEmail = async () => {
    const slug = form.slug.trim().toLowerCase();

    if (!sendTo.trim()) return alert("Enter recipient email");
    if (!slug) return alert("Slug missing");
    if (!variablesValid) return alert("Variables JSON invalid");

    let varsObj = {};
    try {
      varsObj = JSON.parse(testVarsJson || "{}");
    } catch {
      return alert("Test Vars JSON invalid (must be object)");
    }

    try {
      setSending(true);

      // IMPORTANT:
      // This API sends from DB template slug.
      // So Create page pe "Send Test" tabhi kaam karega jab template DB me save ho chuka ho.
      // Create screen pe best flow: Save first, then send test from Edit screen.
      await api.post("/mailer/send-template-api.php", {
        to: sendTo.trim(),
        slug,
        vars: varsObj,
      });

      alert("Test email sent ✅");
      closeSendTest();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader
          title="Create Email Template"
          subtitle="Build reusable templates with {{variables}} and send emails dynamically"
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
        {/* LEFT: FORM */}
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
                placeholder="e.g. gym-approved"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Use this in backend:{" "}
                <b>
                  {"sendTemplateMail(email, '"}
                  {form.slug || "your-template-slug"}
                  {"', vars)"}
                </b>
              </p>


            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Gym Approved Email"
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
              <p className="text-xs text-slate-500 mt-1">
                Inactive templates will not be used while sending emails.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Subject (supports <code>{"{{variable}}"}</code>)
              </label>

              <input
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                placeholder="e.g. Gym Approved – Login Details"
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
                placeholder={`["name","login_url","email","password"]`}
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
                onClick={openPreview}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={openSendTest}
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
                {saving ? "Saving..." : "Create"}
              </button>
            </div>

            <div className="text-xs text-slate-500 pt-2">
              <b>Note:</b> Create page pe “Send Test” tabhi work karega jab template DB me save ho chuka ho.
              Best: create → then edit → send test ✅
            </div>
          </div>

          {/* Detected Vars */}
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

        {/* RIGHT: HTML Editor + Test Vars */}
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
                Preview will replace variables using this data
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
                onClick={closePreview}
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
                onClick={closeSendTest}
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

export default CreateEmailTemplate;
