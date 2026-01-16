import { X } from "lucide-react";
import { useEffect, useState } from "react";

const AssignPlanModal = ({ isOpen, onClose, onAssign, gymName }) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    // reset on open (optional)
    setSelectedPlan("");

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plans = [
    { id: "free", name: "Free", price: "$0", description: "Up to 50 members, basic features" },
    { id: "basic", name: "Basic", price: "$49", description: "Up to 200 members, advanced reporting" },
    { id: "pro", name: "Pro", price: "$99", description: "Up to 1000 members, advanced analytics" },
    { id: "enterprise", name: "Enterprise", price: "$299", description: "Unlimited members, white-label" },
  ];

  const handleAssign = () => {
    if (!selectedPlan) return;
    onAssign?.(selectedPlan);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        // ✅ outside click close
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Assign Plan</h2>
            <p className="text-sm text-slate-500 mt-1">{gymName || ""}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPlan === plan.id
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-base font-semibold text-slate-900">{plan.name}</p>
                      <p className="text-lg font-bold text-slate-900">{plan.price}/mo</p>
                    </div>
                    <p className="text-sm text-slate-600">{plan.description}</p>
                  </div>

                  {selectedPlan === plan.id && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 ml-3">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAssign}
            disabled={!selectedPlan}
            className="flex-1 h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPlanModal;
