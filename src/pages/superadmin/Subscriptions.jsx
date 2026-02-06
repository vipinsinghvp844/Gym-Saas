import { useEffect, useMemo, useState } from "react";
import { Download, CreditCard, Search } from "lucide-react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { formatDate } from "../../utils/date"; // ✅ util function

const statusColors = {
  active: "bg-green-100 text-green-700",
  trial: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  inactive: "bg-slate-100 text-slate-700",
};

const planColors = {
  free: "bg-slate-100 text-slate-700",
  basic: "bg-blue-100 text-blue-700",
  pro: "bg-purple-100 text-purple-700",
  enterprise: "bg-indigo-100 text-indigo-700",
};

export function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    trial: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const loadSubs = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
      };

      if (searchTerm.trim() !== "") params.search = searchTerm.trim();
      if (statusFilter !== "all") params.status = statusFilter;
      if (planFilter !== "all") params.plan = planFilter;

      const res = await api.get("/gym-subscriptions/list.php", { params });

      setSubs(res.data.data || []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
      setStats(res.data.stats || stats);
    } catch (err) {
      console.error("Failed to load subscriptions", err);
      setSubs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubs(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ debounce filters
  useEffect(() => {
    const t = setTimeout(() => {
      loadSubs(1, pagination.limit);
    }, 500);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, planFilter]);

  const exportDisabled = useMemo(() => loading || subs.length === 0, [loading, subs]);

  return (
    <div className="space-y-6 p-5">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Subscriptions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage active gym subscriptions
          </p>
        </div>

        <button
          disabled={exportDisabled}
          className={`h-10 px-4 rounded-lg text-sm font-medium flex items-center gap-2 border
            ${
              exportDisabled
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.active}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Trial</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.trial}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Cancelled</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.cancelled}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search gym, email, plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[160px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[160px]"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Gym
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Next Billing
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
                      <GymLoader label="Loading subscriptions..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && subs.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-sm text-slate-500">
                    No subscriptions found
                  </td>
                </tr>
              )}

              {!loading &&
                subs.map((sub) => {
                  const planKey = (sub.plan_slug || "free").toLowerCase();
                  const statusKey = (sub.status || "inactive").toLowerCase();

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {sub.gym_name}
                        </p>
                        <p className="text-xs text-slate-500">{sub.gym_email}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            planColors[planKey] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {sub.plan_name || planKey}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            statusColors[statusKey] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {statusKey}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          ₹{Number(sub.amount || 0).toLocaleString()}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {formatDate(sub.next_billing_at) || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                          <CreditCard className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => loadSubs(newPage, pagination.limit)}
          onLimitChange={(newLimit) => loadSubs(1, newLimit)}
        />
      </div>
    </div>
  );
}

export default Subscriptions;
