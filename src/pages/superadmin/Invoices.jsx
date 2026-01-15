import { DollarSign, Download, Plus, CreditCard, Receipt, FileText } from 'lucide-react';


const Invoices = () => {
  const invoices = [
    { id: '1', number: 'INV-1234', gym: 'PowerFit Gym', amount: '$299.00', status: 'Paid', date: 'Jan 15, 2024', dueDate: 'Jan 15, 2024' },
    { id: '2', number: 'INV-1233', gym: 'Iron Paradise', amount: '$99.00', status: 'Paid', date: 'Jan 12, 2024', dueDate: 'Jan 12, 2024' },
    { id: '3', number: 'INV-1232', gym: 'Elite Fitness', amount: '$49.00', status: 'Overdue', date: 'Jan 10, 2024', dueDate: 'Jan 10, 2024' },
  ];

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Manage billing invoices</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Invoices</p>
          <p className="text-2xl font-semibold text-slate-900">1,234</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Paid</p>
          <p className="text-2xl font-semibold text-slate-900">1,189</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Pending</p>
          <p className="text-2xl font-semibold text-slate-900">33</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Overdue</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><p className="text-sm font-mono font-semibold text-slate-900">{invoice.number}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{invoice.gym}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{invoice.amount}</p></td>
                <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{invoice.status}</span></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{invoice.date}</p></td>
                <td className="px-6 py-4">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                    <Download className="w-4 h-4" />
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

export default Invoices;
