import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { Download, Plus, X, CheckCircle } from "lucide-react";

const statusBadge = (status) => {
  const s = (status || "").toLowerCase();

  if (s === "paid") return "bg-green-100 text-green-700";
  if (s === "unpaid") return "bg-amber-100 text-amber-700";
  if (s === "refunded") return "bg-slate-100 text-slate-700";
  if (s === "void") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-700";
};

const formatMoney = (amount, currency = "INR") => {
  const symbol =
    currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;
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

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ filters
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // ✅ create invoice modal
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // ✅ gyms dropdown
  const [gyms, setGyms] = useState([]);
  const [loadingGyms, setLoadingGyms] = useState(false);

  // ✅ plans dropdown
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const [createForm, setCreateForm] = useState({
    gym_id: "",
    plan_id: "",
    amount: "",
    currency: "INR",
    due_date: "",
    notes: "",
  });

  // ✅ mark paid modal
  const [payOpen, setPayOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paying, setPaying] = useState(false);

  const [payForm, setPayForm] = useState({
    payment_method: "upi",
    payment_ref: "",
    transaction_id: "",
  });

  /* =========================
     ✅ Load invoices (with pagination)
  ========================= */
  const loadInvoices = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
      };

      if (status !== "all") params.status = status;
      if (search.trim() !== "") params.search = search.trim();

      const res = await api.get("/invoices/list.php", { params });

      setInvoices(res.data.data || []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const loadGymsMin = async () => {
    try {
      setLoadingGyms(true);
      const res = await api.get("/gyms/list-min.php");
      setGyms(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load gyms");
    } finally {
      setLoadingGyms(false);
    }
  };

  const loadPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await api.get("/billing/plans/list.php");
      setPlans(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  /* ✅ initial load */
  useEffect(() => {
    loadInvoices(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ✅ debounce filters */
  useEffect(() => {
    const t = setTimeout(() => {
      loadInvoices(1, pagination.limit);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search]);

  /* =========================
     ⚠️ Stats from current page only
     (After pagination you should make backend stats API)
  ========================= */
  const stats = useMemo(() => {
    const total = invoices.length;

    let paid = 0;
    let unpaid = 0;
    let overdue = 0;

    const now = new Date();

    for (const inv of invoices) {
      const st = (inv.status || "").toLowerCase();

      if (st === "paid") paid++;
      if (st === "unpaid") unpaid++;

      if (st === "unpaid" && inv.due_date) {
        const due = new Date(inv.due_date);
        if (!isNaN(due.getTime()) && due < now) overdue++;
      }
    }

    return { total, paid, unpaid, overdue };
  }, [invoices]);

  const openCreate = async () => {
    setCreateOpen(true);
    if (gyms.length === 0) await loadGymsMin();
    if (plans.length === 0) await loadPlans();
  };

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateForm({
      gym_id: "",
      plan_id: "",
      amount: "",
      currency: "INR",
      due_date: "",
      notes: "",
    });
  };

  const createInvoice = async () => {
    if (!createForm.gym_id) return alert("Please select gym");
    if (!createForm.amount || Number(createForm.amount) <= 0)
      return alert("Please enter amount");

    try {
      setCreating(true);

      await api.post("/invoices/create.php", {
        gym_id: Number(createForm.gym_id),
        plan_id: createForm.plan_id ? Number(createForm.plan_id) : null,
        amount: Number(createForm.amount),
        currency: createForm.currency || "INR",
        due_date: createForm.due_date || null,
        notes: createForm.notes || "",
      });

      alert("Invoice created ✅");
      closeCreate();
      loadInvoices(1, pagination.limit);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Create invoice failed");
    } finally {
      setCreating(false);
    }
  };

  const openPayModal = (invoice) => {
    setSelectedInvoice(invoice);
    setPayForm({
      payment_method: "upi",
      payment_ref: "",
      transaction_id: "",
    });
    setPayOpen(true);
  };

  const closePayModal = () => {
    setPayOpen(false);
    setSelectedInvoice(null);
  };

  const markPaid = async () => {
    if (!selectedInvoice?.id) return alert("Invoice missing");

    try {
      setPaying(true);

      await api.post("/invoices/mark-paid.php", {
        invoice_id: selectedInvoice.id,
        payment_method: payForm.payment_method,
        payment_ref: payForm.payment_ref,
        transaction_id: payForm.transaction_id,
      });

      alert("Invoice Paid ✅ Payment Created ✅");
      closePayModal();
      loadInvoices(pagination.page, pagination.limit);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Mark paid failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage billing invoices
          </p>
        </div>

        <button
          onClick={openCreate}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All Invoices</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="void">Void</option>
          <option value="refunded">Refunded</option>
        </select>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search invoice number / gym..."
          className="w-full sm:w-72 h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stats (page stats only) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Invoices (This Page)</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Paid</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.paid}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Pending</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.unpaid}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Overdue</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.overdue}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Invoice #
                </th>
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
                  Issue Date
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
                      <GymLoader label="Loading invoices..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && invoices.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No invoices found.
                  </td>
                </tr>
              )}

              {!loading &&
                invoices.map((inv) => {
                  const isPaid = (inv.status || "").toLowerCase() === "paid";

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono font-semibold text-slate-900">
                          {inv.invoice_number}
                        </p>
                        <p className="text-xs text-slate-500">ID: {inv.id}</p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {inv.gym_name || "-"}
                        </p>
                        {inv.plan_name ? (
                          <p className="text-xs text-slate-500">
                            Plan: {inv.plan_name}
                          </p>
                        ) : null}
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatMoney(inv.amount, inv.currency)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(
                            inv.status
                          )}`}
                        >
                          {inv.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {formatDate(inv.issued_at || inv.created_at)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600"
                            title="Download Invoice (next step)"
                            onClick={() => alert("PDF download next step ✅")}
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          {!isPaid && (
                            <button
                              onClick={() => openPayModal(inv)}
                              className="h-9 px-3 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Paid
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

        {/* ✅ Pagination Footer */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => loadInvoices(newPage, pagination.limit)}
          onLimitChange={(newLimit) => loadInvoices(1, newLimit)}
        />
      </div>

      {/* CREATE INVOICE MODAL */}
      {createOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Create Invoice
                </h3>
                <p className="text-sm text-slate-500">
                  Generate an invoice for a gym
                </p>
              </div>

              <button
                onClick={closeCreate}
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
                <select
                  value={createForm.gym_id}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, gym_id: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">-- Choose Gym --</option>
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

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Plan (optional)
                </label>
                <select
                  value={createForm.plan_id}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, plan_id: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">-- No plan --</option>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={createForm.amount}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, amount: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 999"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Currency
                  </label>
                  <select
                    value={createForm.currency}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, currency: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Due Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={createForm.due_date}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, due_date: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={createForm.notes}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, notes: e.target.value })
                  }
                  className="w-full min-h-[90px] px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add internal notes..."
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={closeCreate}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={createInvoice}
                disabled={creating}
                className={`h-10 px-4 rounded-xl text-sm font-medium ${
                  creating
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {creating ? "Creating..." : "Create Invoice"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MARK PAID MODAL */}
      {payOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Mark Invoice Paid
                </h3>
                <p className="text-sm text-slate-500">
                  {selectedInvoice.invoice_number} •{" "}
                  {formatMoney(selectedInvoice.amount, selectedInvoice.currency)}
                </p>
              </div>

              <button
                onClick={closePayModal}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Payment Method
                </label>
                <select
                  value={payForm.payment_method}
                  onChange={(e) =>
                    setPayForm({ ...payForm, payment_method: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="wallet">Wallet</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Payment Reference (optional)
                </label>
                <input
                  value={payForm.payment_ref}
                  onChange={(e) =>
                    setPayForm({ ...payForm, payment_ref: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. UPI Ref / Receipt No"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Transaction ID (optional)
                </label>
                <input
                  value={payForm.transaction_id}
                  onChange={(e) =>
                    setPayForm({ ...payForm, transaction_id: e.target.value })
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. TXN-12345"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={closePayModal}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={markPaid}
                disabled={paying}
                className={`h-10 px-4 rounded-xl text-sm font-medium ${
                  paying
                    ? "bg-green-300 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {paying ? "Processing..." : "Confirm Paid"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
