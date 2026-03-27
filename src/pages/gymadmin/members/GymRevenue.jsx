import { Download, DollarSign, TrendingUp, TrendingDown, CreditCard, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GymRevenue = () => {
  const [dateRange, setDateRange] = useState('month');
  const [viewType, setViewType] = useState('overview');

  const monthlyRevenue = [
    { month: 'Aug', revenue: 42350, memberships: 35200, classes: 5150, other: 2000 },
    { month: 'Sep', revenue: 45780, memberships: 38400, classes: 5380, other: 2000 },
    { month: 'Oct', revenue: 48920, memberships: 41200, classes: 5720, other: 2000 },
    { month: 'Nov', revenue: 47650, memberships: 39800, classes: 5850, other: 2000 },
    { month: 'Dec', revenue: 44320, memberships: 37200, classes: 5120, other: 2000 },
    { month: 'Jan', revenue: 51240, memberships: 43600, classes: 5640, other: 2000 },
  ];

  const revenueByPlan = [
    { name: 'Premium', value: 35600, percentage: 45 },
    { name: 'Basic', value: 27200, percentage: 35 },
    { name: 'VIP', value: 12400, percentage: 16 },
    { name: 'Student', value: 3200, percentage: 4 },
  ];

  const COLORS = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b'];

  const recentTransactions = [
    { id: '1', member: 'Alex Thompson', amount: 79.99, plan: 'Premium Monthly', date: 'Feb 4, 2026', status: 'Completed' },
    { id: '2', member: 'Sarah Wilson', amount: 49.99, plan: 'Basic Monthly', date: 'Feb 4, 2026', status: 'Completed' },
    { id: '3', member: 'Mike Brown', amount: 899.99, plan: 'VIP Annual', date: 'Feb 3, 2026', status: 'Completed' },
    { id: '4', member: 'Emma Davis', amount: 79.99, plan: 'Premium Monthly', date: 'Feb 3, 2026', status: 'Pending' },
    { id: '5', member: 'James Miller', amount: 29.99, plan: 'Student Plan', date: 'Feb 3, 2026', status: 'Completed' },
    { id: '6', member: 'Lisa Anderson', amount: 49.99, plan: 'Basic Monthly', date: 'Feb 2, 2026', status: 'Completed' },
  ];

  const upcomingRenewals = [
    { member: 'Alex Thompson', plan: 'Premium Monthly', amount: 79.99, date: 'Feb 5, 2026' },
    { member: 'Sarah Wilson', plan: 'Basic Monthly', amount: 49.99, date: 'Feb 8, 2026' },
    { member: 'Mike Brown', plan: 'Premium Monthly', amount: 79.99, date: 'Feb 10, 2026' },
    { member: 'Emma Davis', plan: 'Basic Monthly', amount: 49.99, date: 'Feb 12, 2026' },
    { member: 'James Miller', plan: 'Student Plan', amount: 29.99, date: 'Feb 15, 2026' },
  ];

  const handleExport = () => {
    console.log('Exporting revenue report...');
  };

  const statusColors = {
    Completed: 'bg-green-100 text-green-700',
    Pending: 'bg-amber-100 text-amber-700',
    Failed: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Revenue Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your gym's revenue and financial performance
          </p>
        </div>
        <button
          onClick={handleExport}
          className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Total Revenue</p>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">$51,240</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+15.6%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Memberships</p>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">$43,600</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+9.5%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Avg per Member</p>
            <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-cyan-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">$94.50</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">-2.3%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Pending</p>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">$3,240</p>
          <p className="text-xs text-slate-500 mt-2">5 renewals due</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="overview">Overview</option>
            <option value="memberships">Memberships</option>
            <option value="classes">Classes</option>
            <option value="other">Other Revenue</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={3}
                name="Total Revenue"
              />
              <Line
                type="monotone"
                dataKey="memberships"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Memberships"
              />
              <Line
                type="monotone"
                dataKey="classes"
                stroke="#10b981"
                strokeWidth={2}
                name="Classes"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue by Plan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={revenueByPlan}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByPlan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {revenueByPlan.map((plan, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx] }}
                  />
                  <span className="text-sm text-slate-700">{plan.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    ${plan.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">{plan.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Member
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{transaction.member}</p>
                        <p className="text-xs text-slate-500">{transaction.plan}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        ${transaction.amount}
                      </p>
                      <p className="text-xs text-slate-500">{transaction.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[transaction.status]
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Upcoming Renewals</h3>
          </div>
          <div className="p-6 space-y-3">
            {upcomingRenewals.map((renewal, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{renewal.member}</p>
                  <p className="text-xs text-slate-500">{renewal.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">${renewal.amount}</p>
                  <p className="text-xs text-slate-500">{renewal.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <p className="text-sm text-slate-600 mb-1">New Subscriptions</p>
            <p className="text-2xl font-semibold text-slate-900">45</p>
            <p className="text-xs text-green-600 mt-1">+12 vs last month</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Renewals</p>
            <p className="text-2xl font-semibold text-slate-900">487</p>
            <p className="text-xs text-green-600 mt-1">92% retention</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Cancellations</p>
            <p className="text-2xl font-semibold text-slate-900">42</p>
            <p className="text-xs text-slate-500 mt-1">8% churn</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Failed Payments</p>
            <p className="text-2xl font-semibold text-slate-900">8</p>
            <p className="text-xs text-red-600 mt-1">$640 lost</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">MRR Growth</p>
            <p className="text-2xl font-semibold text-slate-900">+15.6%</p>
            <p className="text-xs text-green-600 mt-1">+$6,920</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default GymRevenue;

