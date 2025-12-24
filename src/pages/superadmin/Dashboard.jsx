import { useEffect, useState } from "react";
import api from "../../services/api";

const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-5 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
    <p className="text-xs text-emerald-600 mt-1">
      ▲ {change} last month
    </p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/super_admin.php").then((res) => {
      setStats(res.data.data);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard title="Total Gyms" value={stats.total_gyms} change="2.3%" />
        <StatCard title="Active Gyms" value={stats.active_gyms} change="1.8%" />
        <StatCard title="Total Users" value={stats.total_users} change="3.1%" />
        <StatCard title="Revenue" value="$123.6k" change="10.6%" />
      </div>

      {/* LATEST GYMS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Latest Gyms</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Name</th>
              <th>Slug</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.latest_gyms.map((g) => (
              <tr key={g.id} className="border-b">
                <td className="py-2">{g.name}</td>
                <td className="text-center">{g.slug}</td>
                <td className="text-center">{g.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
