import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import PageTitle from "../../layouts/PageTitle";
import RevenueChart from "../../layouts/RevenueChart";
import GymStatusChart from "../../layouts/GymStatusChart";
import LatestGymsTable from "../../layouts/LatestGymsTable";
import RecentPaymentsTable from "../../layouts/RecentPaymentsTable";
import { KPICard } from "../../layouts/KPICard";
import { Building2, TrendingUp, UserCog, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/super_admin.php");
        setStats(res.data.data || null);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-[#f3f6f9] min-h-screen space-y-6">
      {/* PAGE TITLE */}
      <PageTitle
        title="Dashboard"
        subtitle="Overview of gyms, users, and platform activity"
      />

      {/* LOADER */}
      {loading && (
        <div className="py-20 flex justify-center">
          <GymLoader label="Loading dashboard..." />
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !stats && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
          Failed to load dashboard data
        </div>
      )}

      {/* MAIN CONTENT */}
      {!loading && stats && (
        <div className="space-y-6">
          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <KPICard
              title="Total Gyms"
              value={stats.total_gyms || 0}
              change={0}
              icon={Building2}
              iconColor="text-indigo-600"
              iconBgColor="bg-indigo-100"
            />

            <KPICard
              title="Active Gyms"
              value={stats.active_gyms || 0}
              change={0}
              icon={TrendingUp}
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
            />

            <KPICard
              title="Total Gym Admins"
              value={stats.total_users || 0}
              change={0}
              icon={UserCog}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100"
            />

            <KPICard
              title="Platform MRR"
              value={`₹${Number(stats.mrr || 0).toLocaleString()}`}
              change={0}
              icon={DollarSign}
              iconColor="text-emerald-600"
              iconBgColor="bg-emerald-100"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart data={stats.revenue_chart || []} />
            <GymStatusChart data={stats.gym_status_chart || []} />
          </div>

          {/* Latest Gyms + Recent Payments */}
          <LatestGymsTable gyms={stats.latest_gyms || []} />
          <RecentPaymentsTable
            payments={stats.recent_payments || []}
            onRefresh={async () => {
              const res = await api.get("/dashboard/super_admin.php");
              setStats(res.data.data);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
