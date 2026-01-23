import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import PageHeader from "../../components/ui/PageHeader";
import { Save, Loader2, ArrowLeft } from "lucide-react";

const EditEmailTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    subject: "",
    html_body: "",
    status: "active",
  });

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/email-templates/get.php?id=${id}`);
      const tpl = res.data.data;

      setForm({
        name: tpl.name || "",
        slug: tpl.slug || "",
        subject: tpl.subject || "",
        html_body: tpl.html_body || "",
        status: tpl.status || "active",
      });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to load template");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submit = async () => {
    if (!form.name.trim()) return alert("Name required");
    if (!form.subject.trim()) return alert("Subject required");
    if (!form.html_body.trim()) return alert("HTML body required");

    try {
      setSaving(true);

      await api.post("/email-templates/update.php", {
        id: Number(id),
        name: form.name.trim(),
        slug: form.slug.trim(),
        subject: form.subject.trim(),
        html_body: form.html_body,
        status: form.status,
      });

      alert("Template updated ✅");
      navigate("/superadmin/email-templates");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <GymLoader label="Loading template..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="Edit Email Template" subtitle={`Template ID: ${id}`} />

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
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">HTML Body</h3>
              <p className="text-sm text-slate-500">Edit email HTML content</p>
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

export default EditEmailTemplate;
