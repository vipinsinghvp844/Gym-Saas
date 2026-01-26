import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { BarChart3, TrendingUp } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#94a3b8", "#4f46e5"];

const statusColors = {
  active: "bg-green-100 text-green-700",
  trial: "bg-amber-100 text-amber-700",
  inactive: "bg-gray-100 text-gray-700",
  suspended: "bg-red-100 text-red-700",
};

const GymGrowth = () => {
  const [loading, setLoading] = useState(false);

  // filters
  const [months, setMonths] = useState(12);

  const [growthData, setGrowthData] = useState(null);
  const [latestGyms, setLatestGyms] = useState([]);

  const loadGrowth = async () => {
    try {
      setLoading(true);

      const [growthRes, latestRes] = await Promise.all([
        api.get("/analytics/gym_growth.php", { params: { months } }),
        api.get("/analytics/latest_gyms.php", { params: { limit: 8 } }),
      ]);

      setGrowthData(growthRes.data?.data || null);
      setLatestGyms(latestRes.data?.data || []);
    } catch (err) {
      console.error("Gym growth load failed:", err);
      setGrowthData(null);
      setLatestGyms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrowth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadGrowth(), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months]);

  const summary = growthData?.summary || {
    new_gyms: 0,
    approved_gyms: 0,
    trial_gyms: 0,
    active_paid_gyms: 0,
  };

  const monthlyChart = useMemo(() => {
    return Array.isArray(growthData?.monthly_chart) ? growthData.monthly_chart : [];
  }, [growthData]);

  const statusChart = useMemo(() => {
    const safe = Array.isArray(growthData?.status_chart) ? growthData.status_chart : [];
    return safe.map((x) => ({
      name: x.name,
      value: Number(x.value || 0),
    }));
  }, [growthData]);

  const empty =
    !loading &&
    (!growthData ||
      (monthlyChart.length === 0 && statusChart.length === 0 && latestGyms.length === 0));

  return (
    <div className="space-y-6 p-5">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Gym Growth</h1>
          <p className="text-sm text-slate-500 mt-1">
            Analyze gym acquisition and subscription movement
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-2">
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
            <option value={24}>Last 24 months</option>
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex justify-center">
          <GymLoader label="Loading gym growth..." />
        </div>
      )}

      {/* EMPTY */}
      {empty && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No growth data found.</p>
        </div>
      )}

      {/* MAIN */}
      {!loading && !empty && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">New Gyms</p>
              <p className="text-2xl font-semibold text-slate-900">{summary.new_gyms}</p>
              <p className="text-xs text-slate-500 mt-1">Last {months} months</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Approved Gyms</p>
              <p className="text-2xl font-semibold text-slate-900">{summary.approved_gyms}</p>
              <p className="text-xs text-slate-500 mt-1">Admin approved requests</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Trial Started</p>
              <p className="text-2xl font-semibold text-slate-900">{summary.trial_gyms}</p>
              <p className="text-xs text-slate-500 mt-1">Trial subscriptions</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Active Paid Gyms</p>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.active_paid_gyms}
              </p>
              <p className="text-xs text-slate-500 mt-1">Revenue generating gyms</p>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly growth chart */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">
                  Gym Registrations Trend
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Monthly registered gyms
                </p>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={monthlyChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gyms" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status chart */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">
                  Subscription Status Breakdown
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Trial, Active, Inactive, Suspended
                </p>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={statusChart}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {statusChart.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Latest gyms table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Latest Gyms</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Recently registered gyms
                </p>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Auto updates with filters
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                      Gym
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {latestGyms.map((g) => {
                    const s = (g.status || "inactive").toLowerCase();
                    const sub = (g.subscription_status || "-").toLowerCase();

                    return (
                      <tr key={g.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">{g.name}</p>
                          <p className="text-xs text-slate-500">{g.email}</p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {g.plan_name || "No Plan"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              sub === "trial"
                                ? "bg-amber-100 text-amber-700"
                                : sub === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {sub}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              statusColors[s] || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {s}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {latestGyms.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-sm text-slate-500">
                        No gyms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GymGrowth;
