import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Check, X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const GymPlans = () => {
  const [plans, setPlans] = useState([]);
  const [gyms, setGyms] = useState([]);

  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingGyms, setLoadingGyms] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [selectedGymId, setSelectedGymId] = useState("");
  const [assigning, setAssigning] = useState(false);

  // ✅ new stats
  const [stats, setStats] = useState({
    active_plans: 0,
    total_subscriptions: 0,
    active_subscriptions: 0,
    trial_subscriptions: 0,
    cancelled_subscriptions: 0,
  });

  const loadPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await api.get("/billing/plans/list.php");
      setPlans(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  const loadGyms = async () => {
    try {
      setLoadingGyms(true);
      const res = await api.get("/gyms/list-min.php");
      setGyms(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gyms");
    } finally {
      setLoadingGyms(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get("/gym-subscriptions/stats.php");
      if (res.data?.status) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPlans();
    loadStats();
  }, []);

  const activePlansCount = useMemo(
    () => plans.filter((p) => (p.status || "").toLowerCase() === "active").length,
    [plans]
  );

  const openAssignModal = async (plan) => {
    setSelectedPlan(plan);
    setSelectedGymId("");
    setOpen(true);

    if (gyms.length === 0) {
      await loadGyms();
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedPlan(null);
    setSelectedGymId("");
  };

  const assignPlan = async () => {
    if (!selectedPlan?.id) return toast.error("Plan missing");
    if (!selectedGymId) return toast.error("Please select a gym");

    try {
      setAssigning(true);

      await api.post("/gym-subscriptions/assign.php", {
        gym_id: selectedGymId,
        plan_id: selectedPlan.id,
      });

      toast.success("Plan assigned ✅");
      closeModal();

      // ✅ refresh stats after assign
      loadStats();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Assign failed");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Gym Plans</h1>
          <p className="text-sm text-slate-500 mt-1">
            Assign subscription plans for gyms
          </p>
        </div>
      </div>

      {/* ✅ STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Plans</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.active_plans || activePlansCount}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.total_subscriptions || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.active_subscriptions || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Trial Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.trial_subscriptions || 0}
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loadingPlans && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex justify-center">
          <GymLoader label="Loading plans..." />
        </div>
      )}

      {/* PLANS GRID */}
      {!loadingPlans && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, idx) => {
            const features = Array.isArray(plan.features_json)
              ? plan.features_json
              : [];

            const isActive = (plan.status || "").toLowerCase() === "active";

            return (
              <div
                key={plan.id || idx}
                className={`bg-white rounded-xl border-2 ${
                  isActive ? "border-indigo-200" : "border-slate-200"
                } shadow-sm overflow-hidden`}
              >
                {isActive && (
                  <div className="bg-indigo-600 text-white text-center py-2 text-xs font-semibold">
                    ACTIVE
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-sm text-slate-500 ml-2">
                      / {plan.billing_cycle}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {features.length === 0 ? (
                      <li className="text-sm text-slate-500">No features</li>
                    ) : (
                      features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>

                  <button
                    onClick={() => openAssignModal(plan)}
                    className="w-full h-10 rounded-lg text-sm font-medium transition-colors bg-slate-100 text-slate-900 hover:bg-slate-200"
                  >
                    Assign to Gym
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Assign Plan
                </h3>
                <p className="text-sm text-slate-500">
                  Plan:{" "}
                  <span className="font-semibold text-slate-900">
                    {selectedPlan?.name}
                  </span>
                </p>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Select Gym
                </label>

                <div className="relative">
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedGymId}
                    onChange={(e) => setSelectedGymId(e.target.value)}
                    className="w-full h-11 px-3 pr-10 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">-- Choose gym --</option>

                    {loadingGyms ? (
                      <option value="">Loading gyms...</option>
                    ) : (
                      gyms.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.email})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Changes will apply immediately ✅
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Previous active subscription will be closed automatically.
                </p>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={closeModal}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={assignPlan}
                disabled={assigning}
                className={`h-10 px-4 rounded-xl text-sm font-medium ${
                  assigning
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {assigning ? "Assigning..." : "Assign Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymPlans;
