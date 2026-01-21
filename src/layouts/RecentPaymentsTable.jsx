import { Download, ExternalLink, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import api from "../services/api"; // ✅ path tumhare project ke hisaab se adjust

const statusColors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

const formatMoney = (amount, currency = "INR") => {
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${Number(amount || 0).toLocaleString()}`;
};

const formatDate = (dt) => {
  if (!dt) return "-";
  try {
    return new Date(dt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dt;
  }
};

const getStatusLabel = (s) => {
  const st = (s || "").toLowerCase();
  if (st === "paid") return "Paid";
  if (st === "pending") return "Pending";
  if (st === "failed") return "Failed";
  return s || "-";
};

const RecentPaymentsTable = ({ payments = [], onRefresh }) => {
  const [selected, setSelected] = useState(null);
  const [markingId, setMarkingId] = useState(null);

  const markPaid = async (p) => {
    const ok = confirm(`Mark payment as PAID?\n\nGym: ${p.gym_name}\nAmount: ${formatMoney(p.amount, p.currency)}`);
    if (!ok) return;

    try {
      setMarkingId(p.id);

      await api.post("/payments/mark-paid.php", {
        payment_id: p.id,
      });

      alert("Payment marked paid ✅");

      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to mark paid");
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Recent Payments</h3>
          <p className="text-sm text-slate-500 mt-1">Latest payment transactions</p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Gym</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {payments.map((p) => {
                const status = (p.status || "").toLowerCase();
                const statusClass = statusColors[status] || "bg-gray-100 text-gray-700";
                const isPending = status === "pending";
                const isMarking = markingId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{p.gym_name || "-"}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatMoney(p.amount, p.currency)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {formatDate(p.paid_at || p.created_at)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 font-mono">
                        {p.invoice_number || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {/* VIEW */}
                        <button
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                          title="View Payment"
                          onClick={() => setSelected(p)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        {/* MARK PAID */}
                        {isPending && (
                          <button
                            disabled={isMarking}
                            onClick={() => markPaid(p)}
                            className={`px-3 h-9 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                              isMarking
                                ? "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                            title="Mark Paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {isMarking ? "Updating..." : "Mark Paid"}
                          </button>
                        )}

                        {/* DOWNLOAD (future) */}
                        <button
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                          title="Download (later)"
                          onClick={() => console.log("download invoice", p.invoice_number)}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-slate-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View all payments →
          </button>
        </div>
      </div>

      {/* ✅ VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Payment Details</h3>
                <p className="text-sm text-slate-500">Payment ID: {selected.id}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Gym</p>
                <p className="text-sm font-semibold text-slate-900">{selected.gym_name || "-"}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Invoice</p>
                <p className="text-sm font-semibold text-slate-900 font-mono">
                  {selected.invoice_number || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Amount</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatMoney(selected.amount, selected.currency)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Status</p>
                <p className="text-sm font-semibold text-slate-900">
                  {getStatusLabel(selected.status)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Payment Method</p>
                <p className="text-sm font-semibold text-slate-900">
                  {selected.payment_method || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Transaction ID</p>
                <p className="text-sm font-semibold text-slate-900 font-mono break-all">
                  {selected.transaction_id || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs text-slate-500">Payment Ref</p>
                <p className="text-sm font-semibold text-slate-900 font-mono break-all">
                  {selected.payment_ref || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Paid At</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatDate(selected.paid_at)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Created At</p>
                <p className="text-sm font-semibold text-slate-900">
                  {formatDate(selected.created_at)}
                </p>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentPaymentsTable;
