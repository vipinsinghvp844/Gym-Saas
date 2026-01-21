import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Download, ExternalLink, CheckCircle } from "lucide-react";

const statusBadge = (status) => {
  const s = (status || "").toLowerCase();

  if (s === "paid" || s === "completed") return "bg-green-100 text-green-700";
  if (s === "pending") return "bg-amber-100 text-amber-700";
  if (s === "failed") return "bg-red-100 text-red-700";
  if (s === "refunded") return "bg-slate-100 text-slate-700";

  return "bg-slate-100 text-slate-700";
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

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  // modal/view
  const [selected, setSelected] = useState(null);

  // mark paid loading
  const [markingId, setMarkingId] = useState(null);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/payments/list.php?status=${encodeURIComponent(
          status
        )}&search=${encodeURIComponent(search)}`
      );

      setPayments(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      loadPayments();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search]);

  useEffect(() => {
    loadPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = payments.length;

    let completedCount = 0;
    let failedCount = 0;

    let totalAmount = 0;
    let thisMonthAmount = 0;

    const now = new Date();
    const ymNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    for (const p of payments) {
      const st = (p.status || "").toLowerCase();

      if (st === "paid") completedCount++;
      if (st === "failed") failedCount++;

      if (st === "paid") {
        const amount = Number(p.amount || 0);
        totalAmount += amount;

        const paidAt = (p.paid_at || p.created_at || "").slice(0, 7);
        if (paidAt === ymNow) thisMonthAmount += amount;
      }
    }

    return {
      total,
      completedCount,
      failedCount,
      totalAmount,
      thisMonthAmount,
    };
  }, [payments]);

  const markPaid = async (payment) => {
    const ok = confirm(
      `Mark payment as PAID?\n\nGym: ${payment.gym_name}\nAmount: ${formatMoney(
        payment.amount,
        payment.currency
      )}`
    );
    if (!ok) return;

    try {
      setMarkingId(payment.id);

      await api.post("/payments/mark-paid.php", {
        payment_id: payment.id,
      });

      alert("Payment marked paid ✅");
      await loadPayments();
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to mark paid");
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track payment transactions
          </p>
        </div>

        <button
          onClick={() => alert("Export next step ✅")}
          className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gym / txn / ref..."
          className="w-full sm:w-72 h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Paid Revenue</p>
          <p className="text-2xl font-semibold text-slate-900">
            ₹{stats.totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">This Month</p>
          <p className="text-2xl font-semibold text-slate-900">
            ₹{stats.thisMonthAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Completed</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.completedCount}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Failed</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.failedCount}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Gym
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Method
              </th>

              {/* ✅ NEW */}
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan="7" className="py-10">
                  <div className="flex justify-center">
                    <GymLoader label="Loading payments..." />
                  </div>
                </td>
              </tr>
            )}

            {!loading && payments.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No payments found.
                </td>
              </tr>
            )}

            {!loading &&
              payments.map((p) => {
                const st = (p.status || "").toLowerCase();
                const isPending = st === "pending";
                const isMarking = markingId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {p.gym_name || "-"}
                      </p>
                      <p className="text-xs text-slate-500">ID: {p.id}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatMoney(p.amount, p.currency)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {formatDate(p.paid_at || p.created_at)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-mono text-slate-600">
                        {p.invoice_number || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {p.payment_method || "-"}
                        {p.transaction_id ? ` • ${p.transaction_id}` : ""}
                      </p>
                    </td>

                    {/* ✅ ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(p)}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                          title="View payment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        {isPending && (
                          <button
                            disabled={isMarking}
                            onClick={() => markPaid(p)}
                            className={`h-9 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                              isMarking
                                ? "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                            title="Mark paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {isMarking ? "Updating..." : "Mark Paid"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* ✅ VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Payment Details
                </h3>
                <p className="text-sm text-slate-500">
                  Payment ID: {selected.id}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm"
              >
                Close
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Gym</p>
                <p className="text-sm font-semibold text-slate-900">
                  {selected.gym_name || "-"}
                </p>
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
                  {selected.status || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Transaction ID</p>
                <p className="text-sm font-semibold text-slate-900 font-mono break-all">
                  {selected.transaction_id || "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
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

            <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-end gap-2">
              {(selected.status || "").toLowerCase() === "pending" && (
                <button
                  onClick={() => markPaid(selected)}
                  disabled={markingId === selected.id}
                  className={`h-10 px-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                    markingId === selected.id
                      ? "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {markingId === selected.id ? "Updating..." : "Mark Paid"}
                </button>
              )}

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
    </div>
  );
};

export default Payments;
