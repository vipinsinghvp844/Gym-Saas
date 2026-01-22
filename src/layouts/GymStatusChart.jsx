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
  // ✅ safe + remove zero values
  const safeData = Array.isArray(data)
    ? data.filter((d) => Number(d.value || 0) > 0)
    : [];

  const total = safeData.reduce((sum, d) => sum + Number(d.value || 0), 0);

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
        {safeData.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-12">
            No gym status data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={safeData}
                cx="50%"
                cy="50%"
                outerRadius={105}
                dataKey="value"
                labelLine={false}
                label={({ name, value }) => {
                  const percent = total ? Math.round((value / total) * 100) : 0;
                  return `${name} ${percent}%`;
                }}
              >
                {safeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={chartColors[entry.name] || "#64748b"}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [`${value} gyms`, name]}
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
        )}
      </div>
    </div>
  );
};

export default GymStatusChart;
