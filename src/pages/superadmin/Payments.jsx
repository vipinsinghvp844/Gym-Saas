import {  Download } from 'lucide-react';


const Payments = () => {
  const payments = [
    { id: '1', gym: 'PowerFit Gym', amount: '$299.00', status: 'Completed', date: 'Jan 15, 2024', invoice: 'INV-1234', method: 'Card ****4242' },
    { id: '2', gym: 'Iron Paradise', amount: '$99.00', status: 'Completed', date: 'Jan 12, 2024', invoice: 'INV-1233', method: 'Card ****5678' },
    { id: '3', gym: 'Elite Fitness', amount: '$49.00', status: 'Failed', date: 'Jan 10, 2024', invoice: 'INV-1232', method: 'Card ****9012' },
  ];

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500 mt-1">Track payment transactions</p>
        </div>
        <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Payments</p>
          <p className="text-2xl font-semibold text-slate-900">$45,678</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">This Month</p>
          <p className="text-2xl font-semibold text-slate-900">$12,345</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Completed</p>
          <p className="text-2xl font-semibold text-slate-900">342</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Failed</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{payment.gym}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{payment.amount}</p></td>
                <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{payment.status}</span></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{payment.date}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-mono text-slate-600">{payment.invoice}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{payment.method}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;