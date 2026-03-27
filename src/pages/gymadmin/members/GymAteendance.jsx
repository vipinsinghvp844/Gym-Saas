import { Download, Calendar, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GymAttendance = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('overview');

  const weeklyData = [
    { day: 'Mon', checkins: 145, members: 98, classes: 32 },
    { day: 'Tue', checkins: 132, members: 89, classes: 28 },
    { day: 'Wed', checkins: 158, members: 105, classes: 35 },
    { day: 'Thu', checkins: 142, members: 95, classes: 30 },
    { day: 'Fri', checkins: 167, members: 112, classes: 38 },
    { day: 'Sat', checkins: 189, members: 125, classes: 42 },
    { day: 'Sun', checkins: 98, members: 67, classes: 18 },
  ];

  const monthlyData = [
    { month: 'Aug', checkins: 3420, members: 487 },
    { month: 'Sep', checkins: 3685, members: 502 },
    { month: 'Oct', checkins: 3890, members: 518 },
    { month: 'Nov', checkins: 3745, members: 509 },
    { month: 'Dec', checkins: 3320, members: 495 },
    { month: 'Jan', checkins: 4120, members: 542 },
  ];

  const peakHours = [
    { hour: '6 AM', visits: 45 },
    { hour: '7 AM', visits: 78 },
    { hour: '8 AM', visits: 92 },
    { hour: '9 AM', visits: 67 },
    { hour: '10 AM', visits: 54 },
    { hour: '12 PM', visits: 89 },
    { hour: '5 PM', visits: 125 },
    { hour: '6 PM', visits: 156 },
    { hour: '7 PM', visits: 134 },
    { hour: '8 PM', visits: 87 },
  ];

  const topMembers = [
    { name: 'Alex Thompson', visits: 28, avgDuration: '2h 15m', lastVisit: 'Today' },
    { name: 'Sarah Wilson', visits: 26, avgDuration: '1h 45m', lastVisit: 'Today' },
    { name: 'Mike Brown', visits: 24, avgDuration: '2h 30m', lastVisit: 'Yesterday' },
    { name: 'Emma Davis', visits: 23, avgDuration: '1h 30m', lastVisit: 'Today' },
    { name: 'James Miller', visits: 22, avgDuration: '2h 00m', lastVisit: 'Today' },
  ];

  const handleExport = () => {
    console.log('Exporting attendance report...');
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Attendance Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track member attendance and check-in patterns
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
            <p className="text-sm text-slate-600">Today's Check-ins</p>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">189</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+12%</span>
            <span className="text-xs text-slate-500">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Active Members</p>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">125</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+8%</span>
            <span className="text-xs text-slate-500">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Avg. Duration</p>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">1h 45m</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">-5m</span>
            <span className="text-xs text-slate-500">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Peak Hour</p>
            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-pink-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">6 PM</p>
          <p className="text-xs text-slate-500 mt-2">156 check-ins</p>
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
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="overview">Overview</option>
            <option value="daily">Daily Breakdown</option>
            <option value="hourly">Hourly Breakdown</option>
            <option value="members">By Members</option>
            <option value="classes">By Classes</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
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
                dataKey="checkins"
                stroke="#7c3aed"
                strokeWidth={2}
                name="Check-ins"
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Unique Members"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Peak Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="visits" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Visits" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">6-Month Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
                dataKey="checkins"
                stroke="#7c3aed"
                strokeWidth={2}
                name="Check-ins"
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#10b981"
                strokeWidth={2}
                name="Active Members"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Members */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Most Active Members</h3>
          <div className="space-y-3">
            {topMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.lastVisit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">{member.visits} visits</p>
                  <p className="text-xs text-slate-500">{member.avgDuration} avg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Check-ins</p>
            <p className="text-2xl font-semibold text-slate-900">1,031</p>
            <p className="text-xs text-green-600 mt-1">+15% vs last week</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Unique Members</p>
            <p className="text-2xl font-semibold text-slate-900">691</p>
            <p className="text-xs text-green-600 mt-1">+8% vs last week</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Class Attendance</p>
            <p className="text-2xl font-semibold text-slate-900">223</p>
            <p className="text-xs text-green-600 mt-1">+12% vs last week</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Avg per Day</p>
            <p className="text-2xl font-semibold text-slate-900">147</p>
            <p className="text-xs text-slate-500 mt-1">check-ins</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default GymAttendance;