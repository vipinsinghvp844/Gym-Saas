import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import PageTitle from "../../layouts/PageTitle";

const StatCard = ({ title, value, change }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-semibold text-gray-900 mt-1">
      {value}
    </h2>
    <p className="text-xs text-emerald-600 mt-1">
      ▲ {change} last month
    </p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/super_admin.php");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);


  if (!stats) return null;

 return (
  <div className="max-w-7xl mx-auto px-6 py-6 bg-[#f3f6f9] min-h-screen space-y-6">

     {/* PAGE TITLE */}
      <PageTitle
        title="Dashboard"
        subtitle="Overview of gyms, users, and platform activity"
      // rightSlot={
      //   <button className="px-4 py-2 bg-brand text-white rounded-md text-sm">
      //     + Add Member
      //   </button>
      // }
      //       breadcrumb={[
      //   { label: "Home", href: "/gym/dashboard" },
      //   { label: "Dashboard" },
      // ]}
      />

    {/* CONTENT AREA */}
    {loading ? (
      <div className="py-20">
        <GymLoader label="Loading dashboard..." />
      </div>
    ) : (
      <div className="space-y-6">

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Gyms" value={stats.total_gyms} change="2.3%" />
          <StatCard title="Active Gyms" value={stats.active_gyms} change="1.8%" />
          <StatCard title="Total Users" value={stats.total_users} change="3.1%" />
          <StatCard title="Revenue" value="$123.6k" change="10.6%" />
        </div>

        {/* LATEST GYMS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Latest Gyms
          </h3>

          <table className="w-full text-sm text-gray-700">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-center py-2">Slug</th>
                <th className="text-center py-2">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stats.latest_gyms.map((g) => (
                <tr key={g.id}>
                  <td className="py-2">{g.name}</td>
                  <td className="text-center">{g.slug}</td>
                  <td className="text-center">{g.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )}

  </div>
);

};

export default Dashboard;
