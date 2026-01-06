import {
  Users,
  UserCheck,
  FileText,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import PageTitle from "../../layouts/PageTitle";

/* =========================
   STAT CARD
========================= */
const StatCard = ({ title, value, icon: Icon, bg, color }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
    <div
      className={`w-11 h-11 rounded-lg flex items-center justify-center ${bg} ${color}`}
    >
      <Icon size={22} />
    </div>

    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
    </div>
  </div>
);

/* =========================
   DASHBOARD
========================= */
const GymDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-[#f3f6f9] min-h-screen space-y-6">

      {/* PAGE TITLE */}
      <PageTitle
        title="Dashboard"
        subtitle="Overview of your gym performance"
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

      {/* =====================
          TOP STATS
      ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Members"
          value="342"
          icon={Users}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />
        <StatCard
          title="Active Members"
          value="298"
          icon={UserCheck}
          bg="bg-sky-100"
          color="text-sky-600"
        />
        <StatCard
          title="Website Pages"
          value="3"
          icon={FileText}
          bg="bg-amber-100"
          color="text-amber-600"
        />
        <StatCard
          title="Monthly Revenue"
          value="₹42,300"
          icon={CreditCard}
          bg="bg-violet-100"
          color="text-violet-600"
        />
      </div>

      {/* =====================
          ANALYSIS REPORT
      ===================== */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Analysis Report
            </h3>
            <p className="text-xs text-gray-400">
              Income and Expense Overview
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-600">
              <TrendingUp size={14} /> Income
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <TrendingDown size={14} /> Expense
            </span>
          </div>
        </div>

        {/* CHART PLACEHOLDER */}
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm border border-dashed rounded-lg">
          📊 Chart will be added here
        </div>
      </div>

      {/* =====================
          QUICK ACTIONS
      ===================== */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/gym/pages"
            className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900 transition"
          >
            Manage Pages
          </a>

          <a
            href="/gym/members"
            className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100 transition"
          >
            View Members
          </a>

          <a
            href="/gym/settings/profile"
            className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100 transition"
          >
            Gym Settings
          </a>
        </div>
      </div>

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
            <tr>
              <td className="py-3">Rahul Sharma</td>
              <td className="text-center">rahul@gmail.com</td>
              <td className="text-center">
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                  Active
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-3">Amit Verma</td>
              <td className="text-center">amit@gmail.com</td>
              <td className="text-center">
                <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-600">
                  Inactive
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GymDashboard;
