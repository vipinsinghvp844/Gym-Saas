import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import PageHeader from "../../../components/ui/PageHeader";
import { useNavigate } from "react-router-dom";
import { Save, Loader2 } from "lucide-react";
import TemplatePreviewRenderer from "../../../website/TemplatePreviewRenderer";

const CreatePages = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    template_id: "",
  });

  /* =============================
     LOAD TEMPLATES
  ============================== */
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const res = await api.get("/templates/list.php");
      setTemplates(res.data?.data || []);
    } finally {
      setLoadingTemplates(false);
    }
  };

  /* =============================
     ONLY GYM TEMPLATES
  ============================== */
  const gymTemplates = useMemo(() => {
    return templates.filter((t) => t.type === "gym");
  }, [templates]);

  /* =============================
     SELECTED TEMPLATE
  ============================== */
  const selectedTemplate = useMemo(() => {
    return gymTemplates.find(
      (t) => Number(t.id) === Number(form.template_id)
    );
  }, [gymTemplates, form.template_id]);

  /* =============================
     SLUG FORMAT
  ============================== */
  const normalizeSlug = (value) =>
    (value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  /* =============================
     CREATE PAGE
  ============================== */
  const submit = async () => {
    const slug = normalizeSlug(form.slug);

    if (!slug || !form.template_id) {
      alert("Slug and Template required");
      return;
    }

    try {
      setSaving(true);

      const res = await api.post("/gym/pages/create.php", {
        slug,
        template_id: Number(form.template_id),
      });

      if (!res.data.status) {
        alert(res.data.message);
        return;
      }

      alert("Page created ✅");

      navigate(`/gym/pages/edit/${res.data.data.page_id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  /* =============================
     UI
  ============================== */
  return (
    <div className="space-y-6 p-5">

      <PageHeader
        title="Create Website Page"
        subtitle="Choose a template and build your gym website"
      />

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-8">

        {/* ================= SLUG ================= */}
        <div>
          <label className="text-xs font-semibold">
            Page Slug
          </label>

          <input
            className="w-full h-11 px-3 border rounded-xl mt-1"
            placeholder="home, pricing"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
          />

          <p className="text-xs mt-1 text-slate-500">
            URL → <b>/g/{normalizeSlug(form.slug) || "home"}</b>
          </p>
        </div>

        {/* ================= TEMPLATE GRID ================= */}
        <div>
          <label className="text-xs font-semibold mb-3 block">
            Choose Template
          </label>

          {loadingTemplates ? (
            <p className="text-sm text-slate-500">
              Loading templates...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {gymTemplates.map((t) => {
                const selected =
                  Number(form.template_id) === Number(t.id);

                return (
                  <div
                    key={t.id}
                    onClick={() =>
                      setForm({ ...form, template_id: t.id })
                    }
                    className={`cursor-pointer rounded-xl border overflow-hidden transition
                      ${selected
                        ? "border-indigo-600 ring-2 ring-indigo-200"
                        : "border-slate-200 hover:shadow-md"
                      }`}
                  >
                    {/* IMAGE */}
                    <div className="h-40 bg-slate-100">
                      {t.preview_image ? (
                        <img
                          src={`http://localhost:8000/${t.preview_image}`}
                          className="w-full h-full object-cover"
                          alt={t.name}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-slate-400">
                          No Preview
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold">
                        {t.name}
                      </h3>

                      {selected && (
                        <span className="inline-block mt-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= LIVE WEBSITE PREVIEW ================= */}
        {selectedTemplate && (
          <div className="border-t pt-8">

            <h3 className="text-sm font-semibold mb-4">
              Live Website Preview
            </h3>

            <div className="rounded-xl border overflow-hidden bg-white shadow-sm">
              <TemplatePreviewRenderer
              type={selectedTemplate.type}
                structure_json={selectedTemplate.structure_json}
                page_data_json={selectedTemplate.page_data_json}
              />

            </div>

          </div>
        )}

        {/* ================= ACTION ================= */}
        <div className="flex justify-end border-t pt-6">
          <button
            onClick={submit}
            disabled={saving}
            className="h-11 px-6 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}

            {saving ? "Creating..." : "Create Page"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatePages;
