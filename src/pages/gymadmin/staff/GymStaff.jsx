import { Plus, Download, Search, Eye, Edit, Ban } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablePagination from '../../../components/ui/TablePagination';
import api from '../../../services/api';
import GymLoader from "../../../components/ui/GymLoader";

const GymStaff = () => {
  const navigate = useNavigate();
  const [staff,setStaff] = useState([]);
const [stats,setStats] = useState({});
const [loading,setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  });

  const formatShift = (shift) => {
    if (!shift) return shift;
    return shift.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const capitalizeStatus = (status) => {
    if (!status) return status;
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const fetchStaff = async () => {
  try {
    setLoading(true);

    const res = await api.get("/gymadmin/staff/list.php",{
      params:{
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined
      }
    });

    if(res.data.status){
      const formattedStaff = res.data.data.map(member => ({
        id: member.id,
        name: `${member.first_name} ${member.last_name}`,
        email: member.email,
        role: member.role_title,
        shift: formatShift(member.shift),
        status: capitalizeStatus(member.status)
      }));
      
      setStaff(formattedStaff);
      setStats(res.data.stats);

      setPagination(p=>({
        ...p,
        total: res.data.pagination.total,
        totalPages: res.data.pagination.total_pages
      }));
    }

  } finally {
    setLoading(false);
  }
};
useEffect(()=>{
  fetchStaff();
},[pagination.page, pagination.limit, searchTerm]);

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
          <button onClick={() => navigate('/gym/staff/create')} className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Staff</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total_staff || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">On Duty Today</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.active_staff || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Front Desk</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.front_desk || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Maintenance</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.maintenance || 0}</p>
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
        <div className="overflow-x-auto">
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
              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    <GymLoader />
                  </td>
                </tr>
              )}
              {!loading && staff.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No staff found
                  </td>
                </tr>
              )}
              {!loading && staff.map((member) => (
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
        {/* Pagination */}
        <TablePagination
          page={pagination?.page || 1}
          limit={pagination?.limit || 10}
          total={pagination?.total || 0}
          totalPages={pagination?.totalPages || 1}
          onPageChange={(p) => setPagination(p)}
          onLimitChange={(l) => {
            setPagination(prev => ({...prev, limit: l, page: 1}));
          }}
        />
      </div>
    </div>
  );
}


export default GymStaff;