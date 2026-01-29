import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const GymDashboardChart = ({ data, loading }) => {
  const [type, setType] = useState("members"); // members | revenue

  const chartData =
    type === "members"
      ? data.members.map((d) => ({
          month: formatMonth(d.month),
          value: d.count,
        }))
      : data.revenue.map((d) => ({
          month: formatMonth(d.month),
          value: d.amount,
        }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Performance Overview
          </h3>
          <p className="text-xs text-gray-400">
            Last 6 months
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setType("members")}
            className={`px-3 py-1.5 text-xs rounded-md ${
              type === "members"
                ? "bg-sky-100 text-sky-700"
                : "border"
            }`}
          >
            Members
          </button>

          <button
            onClick={() => setType("revenue")}
            className={`px-3 py-1.5 text-xs rounded-md ${
              type === "revenue"
                ? "bg-emerald-100 text-emerald-700"
                : "border"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      {/* BODY */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          No data available yet
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === "members" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0284c7"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#059669"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GymDashboardChart;

/* =========================
   HELPERS
========================= */
const formatMonth = (ym) => {
  const [year, month] = ym.split("-");
  return new Date(year, month - 1).toLocaleString("en-IN", {
    month: "short",
  });
};
