import { Plus, Download, Search, Eye, Edit, Ban, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import TablePagination from '../../../components/ui/TablePagination';

const GymMembers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  });


    const members = [
        { id: '1', name: 'Alex Thompson', email: 'alex@email.com', phone: '+1 (555) 123-4567', plan: 'Premium', status: 'Active', joinDate: 'Jan 5, 2024', lastVisit: 'Today' },
        { id: '2', name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+1 (555) 234-5678', plan: 'Basic', status: 'Active', joinDate: 'Jan 8, 2024', lastVisit: 'Yesterday' },
        { id: '3', name: 'Mike Brown', email: 'mike@email.com', phone: '+1 (555) 345-6789', plan: 'Premium', status: 'Active', joinDate: 'Dec 20, 2023', lastVisit: '2 days ago' },
        { id: '4', name: 'Emma Davis', email: 'emma@email.com', phone: '+1 (555) 456-7890', plan: 'Basic', status: 'Expired', joinDate: 'Nov 10, 2023', lastVisit: '15 days ago' },
        { id: '5', name: 'James Miller', email: 'james@email.com', phone: '+1 (555) 567-8901', plan: 'Premium', status: 'Active', joinDate: 'Jan 15, 2024', lastVisit: 'Today' },
    ];

    const planColors = {
        Basic: 'bg-blue-100 text-blue-700',
        Premium: 'bg-purple-100 text-purple-700',
        VIP: 'bg-indigo-100 text-indigo-700',
    };

    const statusColors = {
        Active: 'bg-green-100 text-green-700',
        Expired: 'bg-red-100 text-red-700',
        Suspended: 'bg-amber-100 text-amber-700',
    };

    return (
        <div className="space-y-6 p-5">
            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Members</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your gym members and memberships
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Member
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Total Members</p>
                    <p className="text-2xl font-semibold text-slate-900">542</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Active Members</p>
                    <p className="text-2xl font-semibold text-slate-900">487</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">New This Month</p>
                    <p className="text-2xl font-semibold text-slate-900">45</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Expiring Soon</p>
                    <p className="text-2xl font-semibold text-slate-900">34</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search members by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[140px]"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Member</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Last Visit</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                                </td>

                                <td className="px-6 py-4 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-sm">{member.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-sm">{member.phone}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${planColors[member.plan]}`}>
                                        {member.plan}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[member.status]}`}>
                                        {member.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-600">{member.joinDate}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{member.lastVisit}</td>

                                <td className="px-6 py-4 flex gap-1">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                                    <button className="p-2 hover:bg-slate-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-red-600"><Ban className="w-4 h-4" /></button>
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


export default GymMembers;