import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import PageTitle from "../../layouts/PageTitle";
import RevenueChart from "../../layouts/RevenueChart";
import GymStatusChart from "../../layouts/GymStatusChart";
import LatestGymsTable from "../../layouts/LatestGymsTable";
import RecentPaymentsTable from "../../layouts/RecentPaymentsTable";

const payments = [
  {
    id: "1",
    gym: "FitZone Downtown",
    amount: "$499.00",
    status: "Paid",
    date: "Jan 5, 2026",
    invoice: "INV-2026-001",
  },
  {
    id: "2",
    gym: "Elite Fitness Center",
    amount: "$299.00",
    status: "Pending",
    date: "Jan 3, 2026",
    invoice: "INV-2026-003",
  },
];

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

        <RevenueChart />
        <GymStatusChart />
        <LatestGymsTable gyms={stats.latest_gyms}/>
        <RecentPaymentsTable payments={payments} />

      </div>
    )}

  </div>
);

};

export default Dashboard;
