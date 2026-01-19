import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  ShieldCheck,
  Ban,
} from "lucide-react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [processingId, setProcessingId] = useState(null);

  // View modal
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gyms/requests.php");
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Failed to load requests", err);
      alert("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ stats calculated from data (no extra API required)
  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    let pending = 0;
    let approvedToday = 0;
    let rejectedToday = 0;

    for (const r of requests) {
      const status = (r.status || "").toLowerCase();

      if (status === "pending") pending++;

      const approvedAt = (r.approved_at || "").slice(0, 10);
      const rejectedAt = (r.rejected_at || "").slice(0, 10);

      if (status === "approved" && approvedAt === today) approvedToday++;
      if (status === "rejected" && rejectedAt === today) rejectedToday++;
    }

    return { pending, approvedToday, rejectedToday };
  }, [requests]);

  const handleAction = async (id, action) => {
    try {
      setProcessingId(id);

      let payload = { request_id: id, action };

      if (action === "rejected") {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;
        payload.reason = reason;
      }

      await api.post("/gyms/approve-request.php", payload);
      await loadRequests();
      setSelected(null);
    } catch (err) {
      console.error("Request action failed", err);
      alert(err?.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "pending").toLowerCase();

    if (s === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          <ShieldCheck className="w-3 h-3" />
          Approved
        </span>
      );
    }

    if (s === "rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <Ban className="w-3 h-3" />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const getPaymentBadge = (payment_status) => {
    const s = (payment_status || "pending").toLowerCase();

    if (s === "paid") {
      return (
        <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-700">
          PAID
        </span>
      );
    }

    if (s === "failed") {
      return (
        <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-700">
          FAILED
        </span>
      );
    }

    return (
      <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700">
        PENDING
      </span>
    );
  };

  const isRowProcessing = (id) => processingId === id;

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Gym Requests</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and approve new gym applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Pending Requests</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Approved Today</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.approvedToday}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Rejected Today</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.rejectedToday}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Gym Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Plan / Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="6" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading requests..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-sm text-slate-500">
                    No gym requests found.
                  </td>
                </tr>
              )}

              {!loading &&
                requests.map((request) => {
                  const status = (request.status || "pending").toLowerCase();
                  const disabled = status !== "pending";

                  return (
                    <tr key={request.id} className="hover:bg-slate-50">
                      {/* Gym */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {request.gym_name}
                        </p>
                        {request.gym_id ? (
                          <p className="text-xs text-slate-500">Gym ID: {request.gym_id}</p>
                        ) : null}
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {request.owner_name}
                        </p>
                        <p className="text-xs text-slate-500">{request.owner_email}</p>
                      </td>

                      {/* Plan/Payment */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                            {request.plan_name || "N/A"}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600">
                              ₹{request.amount || 0}
                            </span>
                            {getPaymentBadge(request.payment_status)}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {request.created_at || "-"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">{getStatusBadge(request.status)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAction(request.id, "approved")}
                            disabled={disabled || isRowProcessing(request.id)}
                            className={`h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5
                              ${
                                disabled
                                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            {isRowProcessing(request.id) ? "Processing..." : "Approve"}
                          </button>

                          <button
                            onClick={() => handleAction(request.id, "rejected")}
                            disabled={disabled || isRowProcessing(request.id)}
                            className={`h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5
                              ${
                                disabled
                                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>

                          <button
                            onClick={() => setSelected(request)}
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Request Details</h2>
                <p className="text-sm text-slate-500">
                  Review full details before approval
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Gym Name</p>
                  <p className="text-sm font-semibold text-slate-900">{selected.gym_name}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selected.status)}</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Owner Name</p>
                  <p className="text-sm font-semibold text-slate-900">{selected.owner_name}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Owner Email</p>
                  <p className="text-sm font-semibold text-slate-900">{selected.owner_email}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Plan</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selected.plan_name || "N/A"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ₹{selected.amount || 0} • {getPaymentBadge(selected.payment_status)}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Requested At</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selected.created_at || "-"}
                  </p>
                </div>

                {/* ✅ Reject reason uses DB column "reason" */}
                {selected.reason ? (
                  <div className="sm:col-span-2 bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-xs text-red-600">Rejection Reason</p>
                    <p className="text-sm font-semibold text-red-700">
                      {selected.reason}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Approve/Reject from modal too */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelected(null)}
                  className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium"
                >
                  Cancel
                </button>

                {(selected.status || "pending").toLowerCase() === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction(selected.id, "rejected")}
                      className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(selected.id, "approved")}
                      className="h-9 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                    >
                      Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
