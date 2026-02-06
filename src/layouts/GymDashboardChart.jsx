import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const GymDashboardChart = ({
  title,
  subtitle,
  data = [],
  dataKey = "total",
  color = "#0284c7",
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* BODY */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          No data available yet
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GymDashboardChart;
