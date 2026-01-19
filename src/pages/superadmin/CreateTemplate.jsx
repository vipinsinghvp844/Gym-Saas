import { useMemo, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { Plus, Trash2, LayoutTemplate, Save, Loader2 } from "lucide-react";

/* ===========================
   AVAILABLE SECTIONS CONFIG
=========================== */
const availableSections = [
  {
    type: "header",
    label: "Header",
    fields: {
      logo_text: "",
      menu: "", // optional: "Features,Pricing,Register"
      button_text: "",
      button_link: "",
    },
  },
  {
    type: "hero",
    label: "Hero",
    fields: {
      title: "",
      subtitle: "",
      button_text: "",
      button_link: "",
    },
  },
  {
    type: "features",
    label: "Features",
    fields: {
      heading: "",
      subheading: "",
      items: "[]", // JSON array
    },
  },
  {
    type: "pricing",
    label: "Pricing",
    fields: {
      heading: "Pricing Plans",
      subheading: "Choose a plan that fits your gym",
      plans: "[]", // JSON array
    },
  },
  {
    type: "testimonials",
    label: "Testimonials",
    fields: {
      heading: "",
      items: "[]", // JSON array
    },
  },
  {
    type: "gallery",
    label: "Gallery",
    fields: {
      heading: "",
      images: "[]", // JSON array
    },
  },
  {
    type: "cta",
    label: "CTA",
    fields: {
      heading: "",
      subheading: "",
      button_text: "",
      button_link: "",
    },
  },
  {
    type: "register_form",
    label: "Register Form",
    fields: {
      title: "",
      subtitle: "",
      submit_text: "Submit Request",
    },
  },
  {
    type: "footer",
    label: "Footer",
    fields: {
      brand: "",
      tagline: "",
      links: "", // optional: "Features,Pricing,Register"
      email: "",
    },
  },
];

/* ===========================
   HELPERS
=========================== */
const isValidJsonArray = (value) => {
  const v = (value ?? "").toString().trim();
  if (v === "") return true; // empty allow, treat as []
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};

const jsonSamplePlans = `[
  {
    "name": "Basic",
    "price": 499,
    "button_text": "Get Started",
    "features": ["Members", "Attendance", "Support"]
  },
  {
    "name": "Pro",
    "price": 999,
    "button_text": "Go Pro",
    "features": ["Everything in Basic", "Billing", "Reports"]
  }
]`;

const jsonSampleFeatures = `[
  "Manage Members",
  "Track Attendance",
  "Online Payments",
  "Automated Reminders"
]`;

const jsonSampleTestimonials = `[
  { "name": "Rahul", "role": "Gym Owner", "message": "This platform saved us hours daily." },
  { "name": "Ankit", "role": "Trainer", "message": "Members tracking is super easy now." }
]`;

const jsonSampleGallery = `[
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3"
]`;

/* ===========================
   COMPONENT
=========================== */
const CreateTemplate = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("platform");
  const [sections, setSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);

  /* ✅ Inject active plans from dashboard */
  const injectPlatformPlans = async () => {
    try {
      setLoadingPlans(true);

      const res = await api.get("/billing/plans-list.php");
      const list = res.data.data || [];

      if (!list.length) {
        alert("No active plans found in dashboard.");
        return;
      }

      // ✅ convert DB plans -> Pricing.jsx format
      const pricingPlans = list.map((p) => ({
  name: p.name,
  price: p.price,
  button_text: "Get Started",
  features:
  Array.isArray(p.features_json) && p.features_json.length > 0
    ? p.features_json
    : ["Member Management", "Attendance Tracking", "Payments & Billing"],

}));


      const prettyJson = JSON.stringify(pricingPlans, null, 2);

      setSections((prev) => {
        const updated = [...prev];
        const idx = updated.findIndex((s) => s.type === "pricing");

        if (idx === -1) {
          alert("Please add Pricing section first.");
          return prev;
        }

        updated[idx] = {
          ...updated[idx],
          data: {
            ...updated[idx].data,
            plans: prettyJson,
          },
        };

        return updated;
      });

      alert("Platform plans injected ✅");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  /* ---------- section count (for titles) ---------- */
  const sectionTypeCounts = useMemo(() => {
    const counts = {};
    for (const s of sections) {
      counts[s.type] = (counts[s.type] || 0) + 1;
    }
    return counts;
  }, [sections]);

  /* ---------- add section ---------- */
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

  /* ---------- update field ---------- */
  const updateField = (index, field, value) => {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        data: {
          ...updated[index].data,
          [field]: value,
        },
      };
      return updated;
    });
  };

  /* ---------- remove section ---------- */
  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- SAVE TEMPLATE ---------- */
  const save = async () => {
    if (!name.trim()) {
      alert("Template name required");
      return;
    }

    if (sections.length === 0) {
      alert("Please add at least one section");
      return;
    }

    // ✅ JSON validation
    for (const s of sections) {
      if (s.type === "pricing" && !isValidJsonArray(s.data?.plans)) {
        alert(`Invalid JSON in "${s.title}" → Plans must be a JSON array.`);
        return;
      }

      if (s.type === "features" && !isValidJsonArray(s.data?.items)) {
        alert(`Invalid JSON in "${s.title}" → Items must be a JSON array.`);
        return;
      }

      if (s.type === "testimonials" && !isValidJsonArray(s.data?.items)) {
        alert(`Invalid JSON in "${s.title}" → Items must be a JSON array.`);
        return;
      }

      if (s.type === "gallery" && !isValidJsonArray(s.data?.images)) {
        alert(`Invalid JSON in "${s.title}" → Images must be a JSON array.`);
        return;
      }
    }

    try {
      setSaving(true);

      // ✅ structure (layout/order)
      const structure_json = {
        sections: sections.map((s) => ({
          id: s.id,
          type: s.type,
        })),
      };

      // ✅ page data (content by section id)
      const page_data_json = {};
      sections.forEach((s) => {
        page_data_json[s.id] = s.data;
      });

      await api.post("/templatess/create.php", {
        name: name.trim(),
        type,
        structure_json,
        page_data_json,
      });

      alert("Template created successfully ✅");

      setName("");
      setType("platform");
      setSections([]);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to create template");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5 space-y-6">
      <PageHeader
        title="Create Template"
        subtitle="Build platform & gym website templates with dynamic sections"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ================= LEFT PANEL ================= */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Template Details
              </h3>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Template Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Modern Gym Landing"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Type */}
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

            {/* Add Sections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-900">
                  Add Sections
                </h4>
                <span className="text-xs text-slate-500">
                  Selected: {sections.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSections.map((sec) => (
                  <button
                    key={sec.type}
                    onClick={() => addSection(sec)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50"
                  >
                    <Plus className="w-4 h-4" />
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <button
              onClick={save}
              disabled={saving}
              className={`w-full h-11 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 ${
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
              {saving ? "Saving..." : "Save Template"}
            </button>

            <p className="text-xs text-slate-500">
              Platform templates → marketing pages <br />
              Gym templates → individual gym websites
            </p>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                Template Structure
              </h3>
              <p className="text-sm text-slate-500">
                Configure section content (drag & drop next step)
              </p>
            </div>

            <div className="p-5 space-y-4">
              {sections.length === 0 ? (
                <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No sections added yet
                  </p>
                </div>
              ) : (
                sections.map((sec, i) => (
                  <div
                    key={sec.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {i + 1}. {sec.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Type: {sec.type}
                        </p>
                      </div>

                      <button
                        onClick={() => removeSection(i)}
                        className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-sm hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.keys(sec.data).map((field) => {
                        const val = sec.data[field];

                        const isJsonEditor =
                          (sec.type === "pricing" && field === "plans") ||
                          (sec.type === "features" && field === "items") ||
                          (sec.type === "testimonials" && field === "items") ||
                          (sec.type === "gallery" && field === "images");

                        if (isJsonEditor) {
                          const valid = isValidJsonArray(val);

                          // sample json based on section
                          let sample = "[]";
                          if (sec.type === "pricing") sample = jsonSamplePlans;
                          if (sec.type === "features") sample = jsonSampleFeatures;
                          if (sec.type === "testimonials") sample = jsonSampleTestimonials;
                          if (sec.type === "gallery") sample = jsonSampleGallery;

                          return (
                            <div
                              key={field}
                              className="md:col-span-2 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-slate-600">
                                  {field.toUpperCase()} (JSON Array)
                                </label>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => updateField(i, field, sample)}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                  >
                                    Load Sample
                                  </button>

                                  {sec.type === "pricing" && field === "plans" && (
                                    <button
                                      type="button"
                                      onClick={injectPlatformPlans}
                                      disabled={loadingPlans}
                                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                                        loadingPlans
                                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                          : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                      }`}
                                    >
                                      {loadingPlans ? "Loading..." : "Use Platform Plans"}
                                    </button>
                                  )}
                                </div>
                              </div>

                              <textarea
                                value={val}
                                onChange={(e) =>
                                  updateField(i, field, e.target.value)
                                }
                                className={`w-full min-h-[170px] px-3 py-2 rounded-xl border font-mono text-sm outline-none focus:ring-2 ${
                                  valid
                                    ? "border-slate-200 focus:ring-indigo-500"
                                    : "border-red-300 focus:ring-red-400"
                                }`}
                              />

                              {!valid && (
                                <p className="text-xs text-red-600">
                                  Invalid JSON ❌ Must be a JSON array.
                                </p>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div key={field} className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600">
                              {field.replaceAll("_", " ")}
                            </label>
                            <input
                              value={val}
                              onChange={(e) =>
                                updateField(i, field, e.target.value)
                              }
                              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
