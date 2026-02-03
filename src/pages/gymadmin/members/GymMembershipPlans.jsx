import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import GymLoader from "../../../components/ui/GymLoader";
import { Plus, DollarSign, Trash2, Pencil, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GymMembershipPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [planStats, setPlanStats] = useState(null);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gymadmin/membership-plans/list.php");
      setPlans(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const loadPlanStats = async () => {
    try {
      const res = await api.get("/gymadmin/membership-plans/stats.php");
      setPlanStats(res.data.data || null);
    } catch (err) {
      console.error(err);
      setPlanStats(null);
    }
  };

  useEffect(() => {
    loadPlans();
    loadPlanStats();
  }, []);

  const activePlansCount = useMemo(
    () => plans.filter((p) => (p.status || "").toLowerCase() === "active").length,
    [plans]
  );

  const totalRevenue = planStats
    ? `₹${Number(planStats.total_revenue || 0).toLocaleString()}`
    : "—";

  const mrr = planStats
    ? `₹${Number(planStats.mrr || 0).toLocaleString()}`
    : "—";

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this plan?");
    if (!ok) return;

    try {
      await api.post("/gymadmin/membership-plans/delete.php", { id });
      await loadPlans();
      await loadPlanStats(); // ✅ refresh stats too
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Membership Plan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage Membership pricing and plan features
          </p>
        </div>

        <button
          onClick={() => navigate("/gym/membership-plans/add")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Plans</p>
          <p className="text-2xl font-semibold text-slate-900">
            {activePlansCount}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-slate-900">{totalRevenue}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">MRR</p>
          <p className="text-2xl font-semibold text-slate-900">{mrr}</p>
        </div>
      </div>

      {/* LOADER */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10">
          <div className="flex justify-center">
            <GymLoader label="Loading plans..." />
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && plans.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No plans found</p>
        </div>
      )}

      {/* PLANS GRID */}
      {!loading && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const features = Array.isArray(plan.features_json)
              ? plan.features_json
              : [];

            // ✅ per-plan summary from backend stats
            const summary = planStats?.plans_summary?.[String(plan.id)] || {
              total: 0,
              active: 0,
              trial: 0,
            };

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl border-2 ${
                  (plan.status || "").toLowerCase() === "active"
                    ? "border-indigo-200"
                    : "border-slate-200"
                } shadow-sm overflow-hidden`}
              >
                {(plan.status || "").toLowerCase() === "active" && (
                  <div className="bg-indigo-600 text-white text-center py-2 text-xs font-semibold">
                    ACTIVE PLAN
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-3">
                    <span className="text-4xl font-bold text-slate-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-sm text-slate-500 ml-2">
                      {plan.billing_cycle}
                    </span>
                  </div>

                  {/* ✅ per plan stats */}
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Total: {summary.total}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Active: {summary.active}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      Trial: {summary.trial}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.length === 0 ? (
                      <li className="text-sm text-slate-500">
                        No features added
                      </li>
                    ) : (
                      features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/gym/membership-plans/edit/${plan.id}`)
                      }
                      className="w-full h-10 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="h-10 px-3 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                      title="Delete plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-3">
                    Slug: {plan.slug}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GymMembershipPlans;
