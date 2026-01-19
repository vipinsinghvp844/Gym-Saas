import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import { Plus, Save, Trash2, Loader2, ArrowLeft } from "lucide-react";

const availableSections = [
  { type: "header", label: "Header", fields: { logo_text: "", menu: "", button: "" } },
  { type: "hero", label: "Hero", fields: { title: "", subtitle: "", button_text: "" } },
  { type: "features", label: "Features", fields: { heading: "", items: "" } },
  { type: "pricing", label: "Pricing", fields: { heading: "", plans: "" } },
  { type: "testimonials", label: "Testimonials", fields: { heading: "", items: "" } },
  { type: "gallery", label: "Gallery", fields: { heading: "", images: "" } },
  { type: "cta", label: "CTA", fields: { text: "", button: "" } },
  { type: "register_form", label: "Register Form", fields: { submit_text: "" } },
  { type: "footer", label: "Footer", fields: { logo: "", social: "", link_text: "" } },
];

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("platform");

  const [sections, setSections] = useState([]); // [{id,type,title,data:{}}]

  const sectionTypeCounts = useMemo(() => {
    const counts = {};
    for (const s of sections) counts[s.type] = (counts[s.type] || 0) + 1;
    return counts;
  }, [sections]);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/templatess/get.php?id=${id}`);
      const tpl = res.data.data;

      setName(tpl.name || "");
      setType(tpl.type || "platform");

      const structure = JSON.parse(tpl.structure_json || "{}");
      const pageData = JSON.parse(tpl.page_data_json || "{}");

      // ✅ rebuild sections editor model
      const rebuilt = (structure.sections || []).map((s, index) => {
        const defaultFields =
          availableSections.find((x) => x.type === s.type)?.fields || {};

        return {
          id: s.id || `${s.type}_${index}`,
          type: s.type,
          title: `${s.type} ${index + 1}`,
          data: pageData[s.id] || pageData[s.type] || { ...defaultFields },
        };
      });

      setSections(rebuilt);
    } catch (err) {
      console.error(err);
      alert("Failed to load template");
    } finally {
      setLoading(false);
    }
  };

  const addSection = (sec) => {
    const count = (sectionTypeCounts[sec.type] || 0) + 1;

    setSections((prev) => [
      ...prev,
      {
        id: `${sec.type}_${Date.now()}`,
        type: sec.type,
        title: `${sec.label} ${count}`,
        data: { ...sec.fields },
      },
    ]);
  };

  const updateField = (index, field, value) => {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        data: { ...updated[index].data, [field]: value },
      };
      return updated;
    });
  };

  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (!name.trim()) return alert("Template name required");
    if (sections.length === 0) return alert("Please add at least one section");

    try {
      setSaving(true);

      const structure_json = {
        sections: sections.map((s) => ({ id: s.id, type: s.type })),
      };

      const page_data_json = {};
      sections.forEach((s) => {
        page_data_json[s.id] = s.data;
      });

      await api.post("/templatess/update.php", {
        id,
        name: name.trim(),
        type,
        structure_json,
        page_data_json,
      });

      alert("Template updated ✅");
      navigate("/superadmin/templates");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <GymLoader label="Loading template..." />
      </div>
    );
  }

  return (
    <div className="p-5 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <PageHeader title="Edit Template" subtitle={`Template ID: ${id}`} />

        <button
          onClick={() => navigate("/superadmin/templates")}
          className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Panel */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Template Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Template Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="platform">Platform (Marketing Website)</option>
                <option value="gym">Gym Website</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Add Sections</p>
                <span className="text-xs text-slate-500">Total: {sections.length}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {availableSections.map((sec) => (
                  <button
                    key={sec.type}
                    onClick={() => addSection(sec)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Plus className="w-4 h-4" />
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={save}
              disabled={saving}
              className={`w-full h-11 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 ${
                saving
                  ? "bg-indigo-300 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Update Template"}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Template Structure
              </h3>
              <p className="text-sm text-slate-500">
                Edit section values below (drag/drop ordering next step)
              </p>
            </div>

            <div className="p-5 space-y-4">
              {sections.length === 0 ? (
                <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No sections in this template
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Add sections from the left panel.
                  </p>
                </div>
              ) : (
                sections.map((sec, i) => (
                  <div
                    key={sec.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {i + 1}. {sec.type}
                        </p>
                        <p className="text-xs text-slate-500">Section ID: {sec.id}</p>
                      </div>

                      <button
                        onClick={() => removeSection(i)}
                        className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.keys(sec.data).map((field) => (
                        <div key={field} className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-600">
                            {field.replaceAll("_", " ")}
                          </label>
                          <input
                            value={sec.data[field]}
                            onChange={(e) => updateField(i, field, e.target.value)}
                            className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 py-4 border-t border-slate-200 text-xs text-slate-500">
              Next: drag/drop section order + preview mode ✅
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
