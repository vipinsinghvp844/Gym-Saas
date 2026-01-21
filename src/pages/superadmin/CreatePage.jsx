import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { useNavigate } from "react-router-dom";
import { Save, Loader2 } from "lucide-react";

const CreatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    slug: "",
    template_id: "",
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const res = await api.get("/templatess/list.php");
      setTemplates(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load templates");
    } finally {
      setLoadingTemplates(false);
    }
  };

  const platformTemplates = useMemo(() => {
    return templates.filter((t) => t.type === "platform");
  }, [templates]);

  const submit = async () => {
    if (!form.slug.trim() || !form.template_id) {
      alert("Slug and Template are required");
      return;
    }

    try {
      setSaving(true);

      await api.post("/pages/create.php", {
        slug: form.slug.trim().toLowerCase(),
        template_id: Number(form.template_id),
      });

      alert("Page created successfully ✅");
      setForm({ slug: "", template_id: "" });

      navigate("/superadmin/pages");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Create page failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <PageHeader
        title="Create Page"
        subtitle="Create a new marketing page and assign a platform template"
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-3xl">
        {/* SLUG */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Page Slug
          </label>
          <input
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="home, pricing, register"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <p className="text-xs text-slate-500 mt-1">
            URL will be: <b>/p/{form.slug || "home"}</b>
          </p>
        </div>

        {/* TEMPLATE */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Select Template
          </label>

          <select
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.template_id}
            onChange={(e) => setForm({ ...form, template_id: e.target.value })}
          >
            <option value="">
              {loadingTemplates ? "Loading templates..." : "Select template"}
            </option>

            {platformTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (#{t.id})
              </option>
            ))}
          </select>

          <p className="text-xs text-slate-500 mt-1">
            Only <b>platform templates</b> can be used for marketing pages.
          </p>
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={submit}
            disabled={saving}
            className={`h-11 px-5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              saving
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Creating..." : "Create Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
