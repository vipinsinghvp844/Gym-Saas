import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">
          Monthly Revenue Growth
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Total revenue trend over the past 12 months
        </p>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${Math.round(value / 1000)}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
              labelFormatter={(label, payload) => {
                const row = payload?.[0]?.payload;
                if (row?.year) return `${label} ${row.year}`;
                return label;
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {(!data || data.length === 0) && (
          <p className="text-sm text-slate-500 mt-4 text-center">
            No revenue data available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
