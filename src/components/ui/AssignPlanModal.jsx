import { useEffect, useState } from "react";
import api from "../../services/api";
import { X, Loader2 } from "lucide-react";

const AssignPlanModal = ({
  isOpen,
  onClose,
  gymName,
  onAssign,
  currentPlanId = "",
}) => {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId || "");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setSelectedPlanId(currentPlanId || "");

    const loadPlans = async () => {
      try {
        setLoadingPlans(true);
        const res = await api.get("/billing/plans/list.php");
        setPlans(res.data.data || []);
      } catch (err) {
        console.error(err);
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, [isOpen, currentPlanId]);

  if (!isOpen) return null;

  const submit = async () => {
    if (!selectedPlanId) return alert("Please select a plan");

    try {
      setAssigning(true);
      await onAssign(selectedPlanId);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Assign Plan
            </h3>
            <p className="text-sm text-slate-500">
              Gym:{" "}
              <span className="font-semibold text-slate-900">{gymName}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Select Plan
            </label>

            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">-- Choose plan --</option>

              {loadingPlans ? (
                <option value="">Loading plans...</option>
              ) : (
                plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.price}/{p.billing_cycle})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Note ✅
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Previous active subscription will be closed automatically.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={assigning}
            className={`h-10 px-4 rounded-xl text-sm font-medium ${
              assigning
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {assigning ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Assigning...
              </span>
            ) : (
              "Assign Plan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPlanModal;
