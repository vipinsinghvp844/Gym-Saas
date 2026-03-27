import { Download, TrendingUp, TrendingDown, Target, Award, Users, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GymPerformance = () => {
  const [dateRange, setDateRange] = useState('month');

  const kpiTrend = [
    { month: 'Aug', memberRetention: 88, classAttendance: 75, revenueGrowth: 12, memberSatisfaction: 82, trainerPerformance: 85 },
    { month: 'Sep', memberRetention: 90, classAttendance: 78, revenueGrowth: 15, memberSatisfaction: 85, trainerPerformance: 87 },
    { month: 'Oct', memberRetention: 91, classAttendance: 82, revenueGrowth: 18, memberSatisfaction: 87, trainerPerformance: 88 },
    { month: 'Nov', memberRetention: 89, classAttendance: 80, revenueGrowth: 14, memberSatisfaction: 84, trainerPerformance: 86 },
    { month: 'Dec', memberRetention: 87, classAttendance: 72, revenueGrowth: 10, memberSatisfaction: 81, trainerPerformance: 84 },
    { month: 'Jan', memberRetention: 92, classAttendance: 85, revenueGrowth: 20, memberSatisfaction: 89, trainerPerformance: 90 },
  ];

  const overallPerformance = [
    { category: 'Member Retention', current: 92, target: 90 },
    { category: 'Class Attendance', current: 85, target: 80 },
    { category: 'Revenue Growth', current: 20, target: 15 },
    { category: 'Member Satisfaction', current: 89, target: 85 },
    { category: 'Trainer Performance', current: 90, target: 88 },
    { category: 'Facility Usage', current: 78, target: 80 },
  ];

  const radarData = [
    { metric: 'Retention', value: 92, fullMark: 100 },
    { metric: 'Attendance', value: 85, fullMark: 100 },
    { metric: 'Revenue', value: 88, fullMark: 100 },
    { metric: 'Satisfaction', value: 89, fullMark: 100 },
    { metric: 'Trainers', value: 90, fullMark: 100 },
    { metric: 'Facility', value: 78, fullMark: 100 },
  ];

  const trainerPerformance = [
    { name: 'Emily Rodriguez', classes: 48, attendance: 92, rating: 4.9, revenue: 3840 },
    { name: 'John Smith', classes: 52, attendance: 89, rating: 4.8, revenue: 4160 },
    { name: 'David Kim', classes: 45, attendance: 95, rating: 4.9, revenue: 3600 },
    { name: 'Sarah Martinez', classes: 38, attendance: 88, rating: 4.7, revenue: 3040 },
  ];

  const classPerformance = [
    { name: 'HIIT', sessions: 32, attendance: 89, revenue: 2560, avgRating: 4.8 },
    { name: 'Yoga', sessions: 28, attendance: 92, revenue: 2240, avgRating: 4.9 },
    { name: 'Spinning', sessions: 24, attendance: 95, revenue: 1920, avgRating: 4.9 },
    { name: 'CrossFit', sessions: 20, attendance: 85, revenue: 1600, avgRating: 4.7 },
    { name: 'Pilates', sessions: 18, attendance: 88, revenue: 1440, avgRating: 4.8 },
  ];

  const goals = [
    { name: 'Member Retention', current: 92, target: 95, unit: '%', status: 'on-track' },
    { name: 'Monthly Revenue', current: 51240, target: 55000, unit: '$', status: 'on-track' },
    { name: 'New Members', current: 45, target: 50, unit: '', status: 'at-risk' },
    { name: 'Class Capacity', current: 85, target: 90, unit: '%', status: 'on-track' },
    { name: 'Member Satisfaction', current: 89, target: 90, unit: '%', status: 'on-track' },
  ];

  const handleExport = () => {
    console.log('Exporting performance report...');
  };

  const getGoalProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-100';
      case 'at-risk':
        return 'text-amber-600 bg-amber-100';
      case 'behind':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Performance Metrics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Analyze gym performance and track KPIs
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

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Overall Score</p>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">87.2%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+5.2%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Member Retention</p>
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">92%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+3%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Class Attendance</p>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">85%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+6%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Revenue Growth</p>
            <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900">+20%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+5%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">KPI Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kpiTrend}>
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
                dataKey="memberRetention"
                stroke="#7c3aed"
                strokeWidth={2}
                name="Retention"
              />
              <Line
                type="monotone"
                dataKey="classAttendance"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Attendance"
              />
              <Line
                type="monotone"
                dataKey="revenueGrowth"
                stroke="#10b981"
                strokeWidth={2}
                name="Revenue Growth"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={12} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" fontSize={10} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.5}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Goals Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Goals Progress</h3>
          <div className="space-y-4">
            {goals.map((goal, idx) => {
              const progress = getGoalProgress(goal.current, goal.target);
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-slate-900">{goal.name}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          goal.status
                        )}`}
                      >
                        {goal.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        {goal.unit === '$' && goal.unit}
                        {goal.current.toLocaleString()}
                        {goal.unit !== '$' && goal.unit}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        / {goal.unit === '$' && goal.unit}
                        {goal.target.toLocaleString()}
                        {goal.unit !== '$' && goal.unit}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trainer Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Trainer Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Trainer
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Classes
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {trainerPerformance.map((trainer, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{trainer.name}</p>
                      <p className="text-xs text-slate-500">{trainer.attendance}% attendance</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{trainer.classes}</p>
                      <p className="text-xs text-slate-500">${trainer.revenue}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-900">
                          {trainer.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Class Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Class
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Sessions
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {classPerformance.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{cls.name}</p>
                      <p className="text-xs text-slate-500">${cls.revenue} revenue</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{cls.sessions}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${cls.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {cls.attendance}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GymPerformance;
