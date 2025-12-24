import { Users, UserCheck, FileText, CreditCard } from "lucide-react";

const Card = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-5 rounded shadow flex items-center gap-4">
    <div className="p-3 rounded bg-emerald-100 text-emerald-600">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  </div>
);

const GymDashboard = () => {
  return (
    <div className="space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card title="Total Members" value="342" icon={Users} />
        <Card title="Active Members" value="298" icon={UserCheck} />
        <Card title="Website Pages" value="3" icon={FileText} />
        <Card title="Monthly Revenue" value="₹42,300" icon={CreditCard} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/gym/pages"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Manage Pages
          </a>

          <a
            href="/gym/members"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            View Members
          </a>

          <a
            href="/gym/settings/profile"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Gym Settings
          </a>
        </div>
      </div>

      {/* RECENT MEMBERS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Members</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Rahul Sharma</td>
              <td className="text-center">rahul@gmail.com</td>
              <td className="text-center text-emerald-600">Active</td>
            </tr>
            <tr>
              <td className="py-2">Amit Verma</td>
              <td className="text-center">amit@gmail.com</td>
              <td className="text-center text-red-500">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GymDashboard;
