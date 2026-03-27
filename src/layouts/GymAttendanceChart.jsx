import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const GymAttendanceChart = ({ data = [], loading }) => {
  const chartData = data.map((d) => ({
    month: formatMonth(d.month),
    value: d.count,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Monthly Attendance
      </h3>

      {loading ? (
        <div className="h-56 flex items-center justify-center text-gray-400">
          Loading attendance...
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          No attendance data yet
        </div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GymAttendanceChart;

const formatMonth = (ym) => {
  const [year, month] = ym.split("-");
  return new Date(year, month - 1).toLocaleString("en-IN", {
    month: "short",
  });
};

