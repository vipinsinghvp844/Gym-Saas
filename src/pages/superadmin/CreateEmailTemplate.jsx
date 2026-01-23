import { useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { useNavigate } from "react-router-dom";
import { Save, Loader2, ArrowLeft } from "lucide-react";

const defaultHtml = `<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
      <div style="padding:16px 20px; background:#4f46e5; color:white;">
        <h2 style="margin:0; font-size:18px;">{{brand_name}}</h2>
      </div>

      <div style="padding:20px;">
        <p>Hello <b>{{owner_name}}</b>,</p>
        <p>Your gym <b>{{gym_name}}</b> has been approved ✅</p>

        <p style="margin-top:16px;">
          <a href="{{login_url}}" style="display:inline-block; padding:10px 14px; background:#4f46e5; color:white; border-radius:10px; text-decoration:none;">
            Login Now
          </a>
        </p>

        <p style="margin-top:20px; font-size:12px; color:#64748b;">
          If you did not request this, ignore this email.
        </p>
      </div>
    </div>
  </body>
</html>`;

const CreateEmailTemplate = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    subject: "",
    html_body: defaultHtml,
    status: "active",
  });

  const submit = async () => {
    if (!form.name.trim()) return alert("Name required");
    if (!form.subject.trim()) return alert("Subject required");
    if (!form.html_body.trim()) return alert("HTML body required");

    try {
      setSaving(true);

      await api.post("/email-templates/create.php", {
        name: form.name.trim(),
        slug: form.slug.trim(),
        subject: form.subject.trim(),
        html_body: form.html_body,
        status: form.status,
      });

      alert("Template created ✅");
      navigate("/superadmin/email-templates");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader
          title="Create Email Template"
          subtitle="Design reusable email templates with placeholders"
        />

        <button
          onClick={() => navigate("/superadmin/email-templates")}
          className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Template Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Gym Approved"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Slug (optional)
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="gym_approved -> gym-approved"
              />
              <p className="text-xs text-slate-500 mt-1">
                Leave empty → auto-generate from name
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your gym {{gym_name}} is approved ✅"
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

            <button
              onClick={submit}
              disabled={saving}
              className={`h-11 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
                saving
                  ? "bg-indigo-300 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Creating..." : "Create Template"}
            </button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Placeholders you can use
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Examples:
                <br />
                <span className="font-mono">
                  {"{{gym_name}}"} {"{{owner_name}}"} {"{{invoice_number}}"}{" "}
                  {"{{amount}}"} {"{{login_url}}"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">HTML Body</h3>
              <p className="text-sm text-slate-500">
                Paste HTML email template here
              </p>
            </div>

            <div className="p-5 space-y-4">
              <textarea
                value={form.html_body}
                onChange={(e) => setForm({ ...form, html_body: e.target.value })}
                className="w-full min-h-[360px] px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    Live Preview
                  </p>
                </div>

                <div
                  className="p-4 max-h-[55vh] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: form.html_body }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmailTemplate;
