import { Plus, Download, Search, Eye, Edit, Ban } from 'lucide-react';
import { useState } from 'react';
import TablePagination from '../../../components/ui/TablePagination';

const GymStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  });

  const staff = [
    { id: '1', name: 'Jennifer Lopez', email: 'jennifer@powerfit.com', role: 'Front Desk', shift: 'Morning', status: 'Active' },
    { id: '2', name: 'Robert Garcia', email: 'robert@powerfit.com', role: 'Maintenance', shift: 'Full Day', status: 'Active' },
    { id: '3', name: 'Amanda White', email: 'amanda@powerfit.com', role: 'Front Desk', shift: 'Evening', status: 'Active' },
    { id: '4', name: 'David Martinez', email: 'david@powerfit.com', role: 'Cleaning', shift: 'Night', status: 'Active' },
  ];

  const roleColors = {
    'Front Desk': 'bg-blue-100 text-blue-700',
    'Maintenance': 'bg-green-100 text-green-700',
    'Cleaning': 'bg-purple-100 text-purple-700',
    'Manager': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Staff</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your gym staff members
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Staff</p>
          <p className="text-2xl font-semibold text-slate-900">8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">On Duty Today</p>
          <p className="text-2xl font-semibold text-slate-900">6</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Front Desk</p>
          <p className="text-2xl font-semibold text-slate-900">3</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Maintenance</p>
          <p className="text-2xl font-semibold text-slate-900">2</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search staff by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{member.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleColors[member.role]}`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{member.shift}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-600">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        page={pagination?.page || 1}
        limit={pagination?.limit || 10}
        total={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
        onPageChange={(p) => setPagination(p)}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
      />
    </div>
  );
}


export default GymStaff;