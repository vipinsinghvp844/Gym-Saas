import { DollarSign, Download, Plus, CreditCard, Receipt, FileText } from 'lucide-react';



const SupportTickets = () => {
  const tickets = [
    { id: '1', title: 'Cannot access member dashboard', gym: 'PowerFit Gym', priority: 'High', status: 'Open', created: '2 hours ago' },
    { id: '2', title: 'Payment processing issue', gym: 'Iron Paradise', priority: 'Critical', status: 'In Progress', created: '5 hours ago' },
    { id: '3', title: 'Feature request: bulk import', gym: 'Elite Fitness', priority: 'Low', status: 'Open', created: '1 day ago' },
  ];

  const priorityColors = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Support Tickets</h1>
          <p className="text-sm text-slate-500 mt-1">Manage customer support requests</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Open Tickets</p>
          <p className="text-2xl font-semibold text-slate-900">23</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">In Progress</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Resolved Today</p>
          <p className="text-2xl font-semibold text-slate-900">8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Response</p>
          <p className="text-2xl font-semibold text-slate-900">2.5 hrs</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-slate-50 cursor-pointer">
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{ticket.title}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-700">{ticket.gym}</p></td>
                <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityColors[ticket.priority]}`}>{ticket.priority}</span></td>
                <td className="px-6 py-4"><span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{ticket.status}</span></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{ticket.created}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupportTickets;