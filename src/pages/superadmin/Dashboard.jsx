import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import PageTitle from "../../layouts/PageTitle";
import RevenueChart from "../../layouts/RevenueChart";
import GymStatusChart from "../../layouts/GymStatusChart";
import LatestGymsTable from "../../layouts/LatestGymsTable";
import RecentPaymentsTable from "../../layouts/RecentPaymentsTable";
import { KPICard } from "../../layouts/KPICard";
import { Building2, TrendingUp, UserCog, DollarSign   } from 'lucide-react';


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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Gyms"
          value={stats.total_gyms}
          change={12.5}
          icon={Building2}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />
        <KPICard
          title="Active Gyms"
          value={stats.active_gyms}
          change={8.2}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <KPICard
          title="Total Gym Admins"
          value={stats.total_users}
          change={5.3}
          icon={UserCog}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <KPICard
          title="Platform MRR"
          value="$112K"
          change={23.1}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
      </div>

         {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <GymStatusChart />
      </div>
        <LatestGymsTable gyms={stats.latest_gyms}/>
        <RecentPaymentsTable payments={payments} />

      </div>
    )}
  </div>
);

};

export default Dashboard;
