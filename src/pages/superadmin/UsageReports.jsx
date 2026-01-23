import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Activity, BarChart3, TrendingUp } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const money = (val = 0) => `₹${Number(val || 0).toLocaleString("en-IN")}`;

const UsageReports = () => {
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState(null);
  const [dailyChart, setDailyChart] = useState([]);

  const [methodsChart, setMethodsChart] = useState([]);
  const [topGyms, setTopGyms] = useState([]);

  const loadAll = async () => {
    try {
      setLoading(true);

      const [usageRes, methodsRes, topRes] = await Promise.all([
        api.get("/analytics/usage_reports.php"),
        api.get("/analytics/revenue_methods.php?currency=INR&months=12"),
        api.get("/analytics/top_gyms.php?currency=INR&months=12&limit=10"),
      ]);

      // ✅ usage_reports.php
      setSummary(usageRes.data?.data?.summary || null);
      setDailyChart(
        Array.isArray(usageRes.data?.data?.daily_chart)
          ? usageRes.data.data.daily_chart
          : []
      );

      // ✅ revenue_methods.php (convert to recharts pie format)
      const methods = Array.isArray(methodsRes.data?.data?.methods)
        ? methodsRes.data.data.methods
        : [];

      setMethodsChart(
        methods.map((m) => ({
          name: String(m.method || "unknown").toUpperCase(),
          value: Number(m.revenue || 0), // ✅ revenue based pie
          count: Number(m.count || 0),
        }))
      );

      // ✅ top_gyms.php
      setTopGyms(
        Array.isArray(topRes.data?.data?.top_gyms) ? topRes.data.data.top_gyms : []
      );
    } catch (err) {
      console.error("UsageReports error:", err);
      setSummary(null);
      setDailyChart([]);
      setMethodsChart([]);
      setTopGyms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const pieColors = useMemo(
    () => ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444", "#94a3b8"],
    []
  );

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Usage Reports</h1>
        <p className="text-sm text-slate-500 mt-1">
          Platform usage statistics, growth and engagement
        </p>
      </div>

      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 flex justify-center">
          <GymLoader label="Loading reports..." />
        </div>
      )}

      {!loading && !summary && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center text-slate-600">
          Failed to load usage reports
        </div>
      )}

      {!loading && summary && (
        <>
          {/* ✅ SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Total Gyms</p>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.total_gyms}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                New (30d): {summary.new_gyms_30d}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Total Members</p>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.total_members}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                New (30d): {summary.new_members_30d}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-semibold text-slate-900">
                {money(summary.total_revenue)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Last 30 days: {money(summary.revenue_30d)}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <p className="text-sm text-slate-600 mb-1">Paid Payments</p>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.total_paid_payments}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                New gyms today: {summary.new_gyms_today}
              </p>
            </div>
          </div>

          {/* ✅ CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ✅ DAILY CHART */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Daily Growth (14 days)
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  New gyms and members trend
                </p>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={dailyChart}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newGyms" name="New Gyms" />
                    <Line
                      type="monotone"
                      dataKey="newMembers"
                      name="New Members"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ✅ PAYMENT METHODS PIE */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Revenue by Payment Methods (12 months)
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Distribution of revenue by payment method
                </p>
              </div>

              <div className="p-6">
                {methodsChart.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center">
                    No payment methods analytics found.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={methodsChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {methodsChart.map((_, idx) => (
                          <Cell
                            key={idx}
                            fill={pieColors[idx % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val, name, props) => {
                          const count = props?.payload?.count ?? 0;
                          return [`${money(val)} (${count} txns)`, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* ✅ TOP GYMS TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Top Gyms (12 months)
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Highest revenue gyms
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
                      <td
                        colSpan="3"
                        className="px-6 py-10 text-center text-sm text-slate-500"
                      >
                        No gyms revenue data found.
                      </td>
                    </tr>
                  ) : (
                    topGyms.map((g) => (
                      <tr key={g.gym_id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {g.gym_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Gym ID: {g.gym_id}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-700">{g.payments}</p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {money(g.revenue)}
                          </p>
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

export default UsageReports;
