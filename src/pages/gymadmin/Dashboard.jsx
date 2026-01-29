import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Users,
  UserCheck,
  UserX,
  FileText,
  AlertTriangle,
} from "lucide-react";
import PageTitle from "../../layouts/PageTitle";
import GymLoader from "../../components/ui/GymLoader";
import GymDashboardChart from "../../layouts/GymDashboardChart";

/* =========================
   STAT CARD
========================= */
const StatCard = ({ title, value, icon: Icon, bg, color, hint }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm space-y-1">
    <div className="flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center ${bg} ${color}`}
      >
        <Icon size={22} />
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold text-gray-900">
          {value ?? "-"}
        </h2>
      </div>
    </div>

    {hint && (
      <p className="text-xs text-gray-400 mt-1">{hint}</p>
    )}
  </div>
);

/* =========================
   DASHBOARD
========================= */
const GymDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [recentMembers, setRecentMembers] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartData, setChartData] = useState({
    members: [],
    revenue: [],
  });

  /* dashboard chart data */

  const loadChartData = async () => {
    try {
      setChartLoading(true);
      const res = await api.get("/dashboard/gym_admin_chart.php");

      setChartData(res.data?.data || {
        members: [],
        revenue: [],
      });
    } catch (err) {
      console.error("Chart API error", err);
    } finally {
      setChartLoading(false);
    }
  };


  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard/gym_admin.php");

      setStats(res.data?.data?.stats || {});
      setRecentMembers(res.data?.data?.recent_members || []);
    } catch {
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    loadChartData();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <GymLoader label="Loading dashboard..." />
      </div>
    );
  }

  const inactiveMembers =
    (stats.total_members || 0) - (stats.active_members || 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-[#f3f6f9] min-h-screen space-y-6">

      {/* PAGE TITLE */}
      <PageTitle
        title="Dashboard"
        subtitle="Overview of your gym performance"
      />

      {/* =====================
          TOP STATS
      ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Members"
          value={stats.total_members}
          icon={Users}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />

        <StatCard
          title="Active Members"
          value={stats.active_members}
          icon={UserCheck}
          bg="bg-sky-100"
          color="text-sky-600"
        />

        <StatCard
          title="Inactive Members"
          value={inactiveMembers}
          icon={UserX}
          bg="bg-rose-100"
          color="text-rose-600"
          hint="Members not currently active"
        />

        <StatCard
          title="Gym Pages"
          value={stats.total_pages}
          icon={FileText}
          bg="bg-amber-100"
          color="text-amber-600"
          hint="Public website pages"
        />
      </div>

      {/* =====================
          CHART
      ===================== */}
      <GymDashboardChart
        loading={chartLoading}
        data={chartData}
      />


      {/* =====================
          SYSTEM ALERTS (OPTIONAL)
      ===================== */}
      {stats.show_alert && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Attention required
            </p>
            <p className="text-xs text-yellow-700">
              Your subscription is expiring soon. Please review billing.
            </p>
          </div>
        </div>
      )}

      {/* =====================
          RECENT MEMBERS
      ===================== */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Recent Members
        </h3>

        <table className="w-full text-sm text-gray-700">
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-center py-2">Email</th>
              <th className="text-center py-2">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {recentMembers.length === 0 && (
              <tr>
                <td colSpan="3" className="py-6 text-center text-gray-400">
                  No members found
                </td>
              </tr>
            )}

            {recentMembers.map((m, idx) => (
              <tr key={idx}>
                <td className="py-3">
                  {m.first_name} {m.last_name}
                </td>
                <td className="text-center">{m.email}</td>
                <td className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${m.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-600"
                      }`}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GymDashboard;
