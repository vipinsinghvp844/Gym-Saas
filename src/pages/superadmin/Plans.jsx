import { DollarSign, Plus} from 'lucide-react';

const Plans = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Subscription Plans</h1>
          <p className="text-sm text-slate-500 mt-1">Manage pricing and plan features</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Plans</p>
          <p className="text-2xl font-semibold text-slate-900">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-slate-900">$45,678</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">MRR</p>
          <p className="text-2xl font-semibold text-slate-900">$112,340</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Plans configuration displayed here</p>
      </div>
    </div>
  );
}


export default Plans;