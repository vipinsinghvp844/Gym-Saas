import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const chartColors = {
  Active: "#22c55e",
  Trial: "#f59e0b",
  Suspended: "#ef4444",
  Inactive: "#94a3b8",
};

const GymStatusChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">
          Gym Status Distribution
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Breakdown of gym accounts by status
        </p>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={safeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {safeData.map((entry, index) => (
                <Cell key={index} fill={chartColors[entry.name] || "#64748b"} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-slate-700">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {safeData.length === 0 && (
          <p className="text-sm text-slate-500 text-center mt-3">
            No gym status data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default GymStatusChart;
