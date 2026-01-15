import { Activity } from 'lucide-react';


const UsageReports = () => {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Usage Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Platform usage statistics and reports</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Users</p>
          <p className="text-2xl font-semibold text-slate-900">8,547</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Daily Active</p>
          <p className="text-2xl font-semibold text-slate-900">3,421</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Sessions Today</p>
          <p className="text-2xl font-semibold text-slate-900">12,345</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Session</p>
          <p className="text-2xl font-semibold text-slate-900">8.5 min</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Usage reports and data displayed here</p>
      </div>
    </div>
  );
}

export default UsageReports;