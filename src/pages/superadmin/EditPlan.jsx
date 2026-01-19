import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const sampleFeatures = `[
  "Member Management",
  "Attendance Tracking",
  "Online Payments"
]`;

const isValidJsonArray = (value) => {
  const v = (value ?? "").toString().trim();
  if (v === "") return true;
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    currency: "INR",
    billing_cycle: "monthly",
    duration_days: "",
    status: "active",
    sort_order: "0",
    features_json: "[]",
  });

  const featuresValid = useMemo(
    () => isValidJsonArray(form.features_json),
    [form.features_json]
  );

  const loadPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/billing/plans/get.php?id=${id}`);
      const p = res.data.data;

      setForm({
        id: p.id,
        name: p.name || "",
        slug: p.slug || "",
        description: p.description || "",
        price: p.price ?? "",
        currency: p.currency || "INR",
        billing_cycle: p.billing_cycle || "monthly",
        duration_days: p.duration_days ?? "",
        status: p.status || "active",
        sort_order: p.sort_order ?? 0,
        features_json: JSON.stringify(p.features_json || [], null, 2),
      });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to load plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const update = async () => {
    if (!form.name.trim()) return alert("Plan name is required");
    if (!form.slug.trim()) return alert("Slug is required");
    if (!featuresValid) return alert("Features JSON must be valid array");

    try {
      setSaving(true);

      await api.post("/billing/plans/update.php", {
        id: form.id,
        name: form.name.trim(),
        slug: slugify(form.slug),
        description: form.description.trim(),
        price: Number(form.price || 0),
        currency: form.currency.trim() || "INR",
        billing_cycle: form.billing_cycle,
        duration_days: form.duration_days ? Number(form.duration_days) : null,
        status: form.status,
        sort_order: Number(form.sort_order || 0),
        features_json: form.features_json.trim()
          ? JSON.parse(form.features_json)
          : [],
      });

      alert("Plan updated ✅");
      navigate("/superadmin/billing/plans");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="Edit Plan" subtitle="Update membership plan details" />

        <button
          onClick={() => navigate("/superadmin/billing/plans")}
          className="h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
              {/* Basic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Plan Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Slug (unique)
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full min-h-[90px] px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Currency
                  </label>
                  <input
                    value={form.currency}
                    onChange={(e) =>
                      setForm({ ...form, currency: e.target.value.toUpperCase() })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={form.billing_cycle}
                    onChange={(e) =>
                      setForm({ ...form, billing_cycle: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                    <option value="lifetime">lifetime</option>
                  </select>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Duration Days
                  </label>
                  <input
                    type="number"
                    value={form.duration_days}
                    onChange={(e) =>
                      setForm({ ...form, duration_days: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({ ...form, sort_order: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Features JSON */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-600">
                    Features (JSON Array)
                  </label>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, features_json: sampleFeatures })}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Load Sample
                  </button>
                </div>

                <textarea
                  value={form.features_json}
                  onChange={(e) =>
                    setForm({ ...form, features_json: e.target.value })
                  }
                  className={`w-full min-h-[160px] px-3 py-2 rounded-lg border text-sm font-mono outline-none focus:ring-2 ${
                    featuresValid
                      ? "border-slate-200 focus:ring-indigo-500"
                      : "border-red-300 focus:ring-red-400"
                  }`}
                />

                {!featuresValid && (
                  <p className="text-xs text-red-600">
                    Invalid JSON ❌ Must be a JSON array.
                  </p>
                )}
              </div>

              <button
                onClick={update}
                disabled={saving}
                className={`h-11 px-5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
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
                {saving ? "Saving..." : "Update Plan"}
              </button>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <p className="text-sm font-semibold text-slate-900">Preview</p>
                <p className="text-xs text-slate-500">Pricing card look</p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {form.name || "Plan Name"}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    ₹{form.price || 0}
                  </span>
                  <span className="text-sm text-slate-500 ml-2">
                    {form.billing_cycle}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-slate-700">
                  {featuresValid ? (
                    (() => {
                      const arr = form.features_json.trim()
                        ? JSON.parse(form.features_json)
                        : [];
                      if (!arr.length) return <li className="text-slate-500">No features</li>;
                      return arr.slice(0, 6).map((f, idx) => (
                        <li key={idx}>✓ {f}</li>
                      ));
                    })()
                  ) : (
                    <li className="text-red-600">Fix JSON to preview features</li>
                  )}
                </ul>

                <button className="w-full h-10 mt-6 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                  Get Started
                </button>

                <p className="text-xs text-slate-500 mt-4">
                  Status: <b>{form.status}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPlan;
