import { Download, CreditCard } from 'lucide-react';


export function Subscriptions() {

  const subs = [
    { id: '1', gym: 'PowerFit Gym', plan: 'Enterprise', status: 'Active', amount: '$299', nextBilling: 'Feb 15, 2024', mrr: '$299' },
    { id: '2', gym: 'Iron Paradise', plan: 'Pro', status: 'Active', amount: '$99', nextBilling: 'Feb 12, 2024', mrr: '$99' },
    { id: '3', gym: 'Elite Fitness', plan: 'Basic', status: 'Trial', amount: '$0', nextBilling: 'Feb 5, 2024', mrr: '$0' },
  ];

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Subscriptions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage active gym subscriptions</p>
        </div>
        <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">344</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active</p>
          <p className="text-2xl font-semibold text-slate-900">234</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Trial</p>
          <p className="text-2xl font-semibold text-slate-900">87</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Cancelled</p>
          <p className="text-2xl font-semibold text-slate-900">23</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Next Billing</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {subs.map(sub => (
              <tr key={sub.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{sub.gym}</p></td>
                <td className="px-6 py-4"><span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">{sub.plan}</span></td>
                <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{sub.status}</span></td>
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{sub.amount}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{sub.nextBilling}</p></td>
                <td className="px-6 py-4">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                    <CreditCard className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subscriptions;