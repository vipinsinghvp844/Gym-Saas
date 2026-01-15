import { TrendingUp, BarChart3, Activity } from 'lucide-react';

const RevenueAnalytics = () => {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Revenue Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Track revenue performance and trends</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-slate-900">$456,789</p>
          <p className="text-xs text-green-600 mt-1">+23.1% vs last month</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">MRR</p>
          <p className="text-2xl font-semibold text-slate-900">$112,340</p>
          <p className="text-xs text-green-600 mt-1">+15.2% vs last month</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">ARR</p>
          <p className="text-2xl font-semibold text-slate-900">$1.35M</p>
          <p className="text-xs text-green-600 mt-1">+18.5% vs last year</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">ARPU</p>
          <p className="text-2xl font-semibold text-slate-900">$326</p>
          <p className="text-xs text-green-600 mt-1">+8.3% vs last month</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Revenue charts and analytics displayed here</p>
      </div>
    </div>
  );
}

export default RevenueAnalytics;