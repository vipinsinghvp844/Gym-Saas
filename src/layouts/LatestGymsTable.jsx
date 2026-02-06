import { useState } from "react";
import { ExternalLink, CreditCard, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GlobalPreviewModal from "../components/ui/GlobalPreviewModal";
import AssignPlanModal from "../components/ui/AssignPlanModal";
import api from "../services/api";
import { formatDateTime } from "../utils/date";

const statusColors = {
  active: "bg-green-100 text-green-700",
  trial: "bg-amber-100 text-amber-700",
  suspended: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-700",
};

const planColors = {
  free: "bg-slate-100 text-slate-700",
  basic: "bg-blue-100 text-blue-700",
  pro: "bg-purple-100 text-purple-700",
  enterprise: "bg-indigo-100 text-indigo-700",
};

const LatestGymsTable = ({ gyms = [] }) => {
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const openPreview = (gym) => {
    setPreviewData(gym);
    setPreviewOpen(true);
  };

  const openAssignPlan = (gym) => {
    setSelectedGym(gym);
    setAssignOpen(true);
  };

  const handleAssignPlan = async (planId) => {
    if (!selectedGym?.id) return;
    if (!planId) return;

    try {
      setAssigning(true);

      await api.post("/gym-subscriptions/assign.php", {
        gym_id: selectedGym.id,
        plan_id: planId,
      });

      // ✅ Optional: navigate to gyms list to see updated plan
      // navigate("/superadmin/gyms");

      alert("Plan assigned ✅");
      setAssignOpen(false);
      setSelectedGym(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Assign failed");
    } finally {
      setAssigning(false);
    }
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Latest Gyms</h3>
        <p className="text-sm text-slate-500 mt-1">
          Recently registered gym accounts
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {gyms.map((gym) => {
              const status = (gym.status || "inactive").toLowerCase();

              // ✅ plan key should come from slug (basic/pro/free...)
              const planKey = (gym.plan_slug || "").toLowerCase();

              // ✅ label should show plan_name if exists, else show slug, else No Plan
              const planLabel = gym.plan_name || (planKey ? planKey : "No Plan");

              // ✅ plan badge color should use planKey (not label)
              const planClass =
                planKey && planColors[planKey]
                  ? planColors[planKey]
                  : "bg-slate-100 text-slate-700";

              return (
                <tr key={gym.id} className="hover:bg-slate-50 transition-colors">
                  {/* NAME */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{gym.name}</p>
                    <p className="text-xs text-slate-500">Slug: {gym.slug}</p>
                  </td>

                  {/* PLAN */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}
                    >
                      {planLabel}
                    </span>

                    {(gym.subscription_status || "").toLowerCase() === "trial" && (
                      <p className="text-[11px] text-amber-600 mt-1">Trial Running</p>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* CREATED */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600"> {formatDateTime(gym.created_at)}</p>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openPreview(gym)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                        title="Preview Gym"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openAssignPlan(gym)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                        title="Assign Plan"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigate("/superadmin/gyms")}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                        title="Manage in Gyms"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}


            {gyms.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No gyms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button
          onClick={() => navigate("/superadmin/gyms")}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View all gyms →
        </button>
      </div>

      {/* ✅ PREVIEW MODAL */}
      <GlobalPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        type="gym"
        data={previewData}
      />

      {/* ✅ ASSIGN PLAN MODAL */}
      <AssignPlanModal
        isOpen={assignOpen}
        onClose={() => {
          setAssignOpen(false);
          setSelectedGym(null);
        }}
        gymName={selectedGym?.name || ""}
        loading={assigning}
        onAssign={handleAssignPlan}
      />
    </div>
  );
};

export default LatestGymsTable;
