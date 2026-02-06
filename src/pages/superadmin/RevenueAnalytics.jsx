import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { TrendingUp, Activity, BarChart3 } from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const money = (val = 0, currency = "INR") => {
  const sym = currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;
  return `${sym}${Number(val || 0).toLocaleString("en-IN")}`;
};

const RevenueAnalytics = () => {
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState("INR");
  const [months, setMonths] = useState(12);

  const [analytics, setAnalytics] = useState(null);
  const [methods, setMethods] = useState([]);
  const [topGyms, setTopGyms] = useState([]);

  const loadAll = async () => {
    try {
      setLoading(true);

      const [aRes, mRes, tRes] = await Promise.all([
        api.get(`/analytics/revenue_analytics.php?currency=${currency}&months=${months}`),
        api.get(`/analytics/revenue_methods.php?currency=${currency}&months=${months}`),
        api.get(`/analytics/top_gyms.php?currency=${currency}&months=${months}&limit=10`),
      ]);

      setAnalytics(aRes.data?.data || null);

      // ✅ convert methods -> pie compatible
      const rows = Array.isArray(mRes.data?.data?.methods) ? mRes.data.data.methods : [];
      setMethods(
        rows.map((r) => ({
          name: String(r.method || "unknown").toUpperCase(),
          value: Number(r.revenue || 0),
          count: Number(r.count || 0),
        }))
      );

      setTopGyms(Array.isArray(tRes.data?.data?.top_gyms) ? tRes.data.data.top_gyms : []);
    } catch (e) {
      console.error("RevenueAnalytics load error:", e);
      setAnalytics(null);
      setMethods([]);
      setTopGyms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, months]);

  const pieColors = useMemo(
    () => ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444", "#94a3b8", "#8b5cf6"],
    []
  );

  const changeTextColor =
    (analytics?.mrr_change_percent || 0) >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Revenue Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track revenue, MRR, ARR and revenue sources
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>

          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
            <option value={24}>Last 24 months</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex justify-center">
          <GymLoader label="Loading revenue analytics..." />
        </div>
      )}

      {/* Empty */}
      {!loading && !analytics && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center text-slate-600">
          Failed to load revenue analytics
        </div>
      )}

      {!loading && analytics && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-semibold text-slate-900">
                {money(analytics.total_revenue, analytics.currency)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Period: {analytics.months} months
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">MRR (Current Month)</p>
              <p className="text-2xl font-semibold text-slate-900">
                {money(analytics.mrr, analytics.currency)}
              </p>
              <p className={`text-xs mt-1 ${changeTextColor}`}>
                {analytics.mrr_change_percent >= 0 ? "+" : ""}
                {analytics.mrr_change_percent}% vs last month
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">ARR (Run Rate)</p>
              <p className="text-2xl font-semibold text-slate-900">
                {money(analytics.arr, analytics.currency)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ARR = MRR × 12
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">ARPU</p>
              <p className="text-2xl font-semibold text-slate-900">
                {money(analytics.arpu, analytics.currency)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Active subs: {analytics.active_subscriptions}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Revenue Trend
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Month-wise paid revenue
                </p>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={analytics.revenue_chart || []}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(val) => money(val, analytics.currency)}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Methods Pie */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Revenue by Payment Method
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Payment method split
                </p>
              </div>

              <div className="p-6">
                {methods.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center">
                    No payment method data found.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={methods}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {methods.map((_, idx) => (
                          <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val, name, props) => {
                          const c = props?.payload?.count ?? 0;
                          return [`${money(val, analytics.currency)} (${c} txns)`, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Top Gyms */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Top Gyms</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Highest revenue gyms (paid)
                </p>
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
                      Payments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                      Revenue
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {topGyms.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-10 text-center text-sm text-slate-500">
                        No top gyms found.
                      </td>
                    </tr>
                  ) : (
                    topGyms.map((g) => (
                      <tr key={g.gym_id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">{g.gym_name}</p>
                          <p className="text-xs text-slate-500">Gym ID: {g.gym_id}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {g.payments}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          {money(g.revenue, analytics.currency)}
                        </td>
                      </tr>
                    ))
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

export default RevenueAnalytics;
