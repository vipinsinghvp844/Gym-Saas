import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { Search } from "lucide-react";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [module, setModule] = useState("all");
  const [action, setAction] = useState("all");
  const [search, setSearch] = useState("");

  // pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const loadLogs = async (page = 1, limit = 20) => {
    try {
      setLoading(true);

      const params = { page, limit };
      if (module !== "all") params.module = module;
      if (action !== "all") params.action = action;
      if (search.trim()) params.search = search.trim();

      const res = await api.get("/superadmin/audit-logs/list.php", { params });

      setLogs(res.data.data || []);
      setPagination(res.data.pagination || pagination);
    } catch (err) {
      console.error(err);
      alert("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(1, pagination.limit);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      loadLogs(1, pagination.limit);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [module, action, search]);

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track all system and admin activities
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="h-10 px-3 border rounded-lg text-sm"
          >
            <option value="all">All Modules</option>
            <option value="gym">Gym</option>
            <option value="plan">Plan</option>
            <option value="user">User</option>
            <option value="payment">Payment</option>
            <option value="settings">Settings</option>
            <option value="auth">Auth</option>
          </select>

          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="h-10 px-3 border rounded-lg text-sm"
          >
            <option value="all">All Actions</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search description..."
            className="w-full h-10 pl-9 pr-3 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-xs text-left font-semibold">User</th>
              <th className="px-6 py-3 text-xs text-left font-semibold">Action</th>
              <th className="px-6 py-3 text-xs text-left font-semibold">Module</th>
              <th className="px-6 py-3 text-xs text-left font-semibold">Description</th>
              <th className="px-6 py-3 text-xs text-left font-semibold">IP</th>
              <th className="px-6 py-3 text-xs text-left font-semibold">Time</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading && (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <GymLoader label="Loading logs..." />
                </td>
              </tr>
            )}

            {!loading && logs.length === 0 && (
              <tr>
                <td colSpan="6" className="py-10 text-center text-sm text-slate-500">
                  No logs found
                </td>
              </tr>
            )}

            {!loading &&
              logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm">
                    <p className="font-medium">{l.user_name || "System"}</p>
                    <p className="text-xs text-slate-500">{l.user_role}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{l.action}</td>
                  <td className="px-6 py-4 text-sm">{l.module}</td>
                  <td className="px-6 py-4 text-sm">{l.description}</td>
                  <td className="px-6 py-4 text-sm font-mono">{l.ip_address}</td>
                  <td className="px-6 py-4 text-sm font-mono">
                    {new Date(l.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(p) => loadLogs(p, pagination.limit)}
          onLimitChange={(l) => loadLogs(1, l)}
        />
      </div>
    </div>
  );
};

export default AuditLogs;
