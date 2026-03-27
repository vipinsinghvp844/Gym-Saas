import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "./GymLoader";
import { X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const AssignTemplateModal = ({ isOpen, onClose, template, onAssigned }) => {
  const [gyms, setGyms] = useState([]);
  const [loadingGyms, setLoadingGyms] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState("");
  const [assigning, setAssigning] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setSelectedGymId("");
      loadGyms();
    }
  }, [isOpen]);

  const assignTemplate = async () => {
    if (!template?.id) return toast.error("Template missing");
    if (!selectedGymId) return toast.error("Please select a gym");

    try {
      setAssigning(true);

      await api.post("/templates/assign.php", {
        gym_id: Number(selectedGymId),
        template_id: Number(template.id),
      });

      toast.success("Template assigned ✅");
      onClose?.();

      if (onAssigned) onAssigned();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Assign failed");
    } finally {
      setAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Assign Template
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Template:{" "}
              <span className="font-semibold text-slate-900">
                {template?.name || "-"}
              </span>
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

          {loadingGyms && (
            <div className="flex justify-center py-4">
              <GymLoader label="Loading gyms..." />
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              This will update gym website template ✅
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Gym landing page will use the selected template immediately.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            onClick={assignTemplate}
            disabled={assigning}
            className={`h-10 px-4 rounded-xl text-sm font-medium ${
              assigning
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {assigning ? "Assigning..." : "Assign Template"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTemplateModal;
