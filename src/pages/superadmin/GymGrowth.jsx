import { BarChart3 } from 'lucide-react';


const GymGrowth = () => {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Gym Growth</h1>
        <p className="text-sm text-slate-500 mt-1">Analyze gym acquisition and growth metrics</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">New Gyms (30d)</p>
          <p className="text-2xl font-semibold text-slate-900">42</p>
          <p className="text-xs text-green-600 mt-1">+12.5% vs previous</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Churned Gyms</p>
          <p className="text-2xl font-semibold text-slate-900">8</p>
          <p className="text-xs text-red-600 mt-1">2.3% churn rate</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Net Growth</p>
          <p className="text-2xl font-semibold text-slate-900">+34</p>
          <p className="text-xs text-green-600 mt-1">10.9% growth</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Conversion Rate</p>
          <p className="text-2xl font-semibold text-slate-900">68%</p>
          <p className="text-xs text-green-600 mt-1">+5.2% vs last month</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Growth charts and metrics displayed here</p>
      </div>
    </div>
  );
}

export default GymGrowth;