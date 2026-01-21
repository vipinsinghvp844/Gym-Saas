import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import { Save, Loader2, Eye, ArrowLeft } from "lucide-react";

const isValidJsonArray = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [structure, setStructure] = useState({ sections: [] });
  const [pageData, setPageData] = useState({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line
  }, [id]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/pages/get-one.php?id=${id}`);
      const row = res.data.data;

      setPage(row);

      const struct = JSON.parse(row.structure_json || "{}");
      const data = JSON.parse(row.page_data_json || "{}");

      setStructure(struct?.sections ? struct : { sections: [] });
      setPageData(data || {});
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  const sections = useMemo(() => structure?.sections || [], [structure]);

  const updateField = (sectionId, field, value) => {
    setPageData((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [field]: value,
      },
    }));
  };

  const save = async () => {
    try {
      // ✅ validate json fields before save
      for (const s of sections) {
        const sid = s.id || s.type;
        const data = pageData[sid] || {};

        // json fields by type
        if (s.type === "features" && data.items && !isValidJsonArray(data.items)) {
          alert(`Invalid JSON in Features items`);
          return;
        }

        if (s.type === "pricing" && data.plans && !isValidJsonArray(data.plans)) {
          alert(`Invalid JSON in Pricing plans`);
          return;
        }

        if (s.type === "testimonials" && data.items && !isValidJsonArray(data.items)) {
          alert(`Invalid JSON in Testimonials items`);
          return;
        }

        if (s.type === "gallery" && data.images && !isValidJsonArray(data.images)) {
          alert(`Invalid JSON in Gallery images`);
          return;
        }
      }

      setSaving(true);

      await api.post("/pages/update.php", {
        id: Number(id),
        page_data_json: pageData,
      });

      alert("Page updated ✅");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const openPreview = () => {
    if (!page?.slug) return;
    window.open(`/p/${page.slug}`, "_blank");
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <GymLoader label="Loading page..." />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Page not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader
          title={`Edit Page: /${page.slug}`}
          subtitle={`Template: ${page.template_name || "-"} (ID: ${page.template_id})`}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/superadmin/pages")}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={openPreview}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          <button
            onClick={save}
            disabled={saving}
            className={`h-10 px-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              saving
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold text-slate-900">Page Sections</h3>
          <p className="text-sm text-slate-500">
            Update section content. Structure/order comes from template.
          </p>
        </div>

        <div className="p-5 space-y-4">
          {sections.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">No sections found</p>
              <p className="text-xs text-slate-500 mt-1">
                Template structure_json has no sections.
              </p>
            </div>
          ) : (
            sections.map((sec, idx) => {
              const sectionId = sec.id || sec.type;
              const data = pageData[sectionId] || {};

              const fields = Object.keys(data);

              return (
                <div
                  key={sectionId}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {idx + 1}. {sec.type}
                      </p>
                      <p className="text-xs text-slate-500">Section ID: {sectionId}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fields.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No fields found in page_data_json for this section.
                      </p>
                    ) : (
                      fields.map((field) => {
                        const val = data[field] ?? "";

                        const isJsonEditor =
                          (sec.type === "features" && field === "items") ||
                          (sec.type === "pricing" && field === "plans") ||
                          (sec.type === "testimonials" && field === "items") ||
                          (sec.type === "gallery" && field === "images");

                        if (isJsonEditor) {
                          const valid = isValidJsonArray(val);

                          return (
                            <div key={field} className="md:col-span-2 space-y-1">
                              <label className="block text-xs font-semibold text-slate-600">
                                {field} (JSON Array)
                              </label>

                              <textarea
                                value={val}
                                onChange={(e) =>
                                  updateField(sectionId, field, e.target.value)
                                }
                                className={`w-full min-h-[180px] px-3 py-2 rounded-xl border font-mono text-sm outline-none focus:ring-2 ${
                                  valid
                                    ? "border-slate-200 focus:ring-indigo-500"
                                    : "border-red-300 focus:ring-red-500"
                                }`}
                              />

                              <p
                                className={`text-xs ${
                                  valid ? "text-slate-500" : "text-red-600"
                                }`}
                              >
                                {valid ? "Valid JSON ✅" : "Invalid JSON ❌ (must be array)"}
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div key={field} className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-600">
                              {field.replaceAll("_", " ")}
                            </label>
                            <input
                              value={val}
                              onChange={(e) =>
                                updateField(sectionId, field, e.target.value)
                              }
                              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
