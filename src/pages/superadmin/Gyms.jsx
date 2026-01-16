import { Plus, Download, Search, Filter, ArrowUpDown, Eye, Edit, CreditCard, XCircle, CheckCircle, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import { fetchGyms, updateGymStatus } from "../../../redux/actions/gymAction";

const Gyms = () => {
  const [selectedGyms, setSelectedGyms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
    const dispatch = useDispatch();
  const { list, listLoading } = useSelector((state) => state.gym);
  const { stats, statsLoading } = useSelector((state) => state.gym);
  console.log(stats,"stats");
  

  


  useEffect(() => {
    dispatch(fetchGyms());
  }, [dispatch]);

  const planColors = {
  Basic: "bg-blue-100 text-blue-700",
  Pro: "bg-purple-100 text-purple-700",
  Enterprise: "bg-indigo-100 text-indigo-700",
};

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Trial: "bg-amber-100 text-amber-700",
  Inactive:"bg-grey-100 text-white-700",
  Suspended: "bg-red-100 text-red-700",
};

  const handleSelectAll = () => {
    if (selectedGyms.length === list.length) {
      setSelectedGyms([]);
    } else {
      setSelectedGyms(list.map(g => g.id));
    }
  };

  const handleSelectGym = (id) => {
    if (selectedGyms.includes(id)) {
      setSelectedGyms(selectedGyms.filter(gId => gId !== id));
    } else {
      setSelectedGyms([...selectedGyms, id]);
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Gyms</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage all gyms across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Gym
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Gyms</p>
          <p className="text-2xl font-semibold text-slate-900">{list.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Gyms</p>
          <p className="text-2xl font-semibold text-slate-900">234</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Trial Gyms</p>
          <p className="text-2xl font-semibold text-slate-900">87</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Suspended Gyms</p>
          <p className="text-2xl font-semibold text-slate-900">23</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by gym name, owner, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {selectedGyms.length > 0 && (
          <div className="px-6 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-900">{selectedGyms.length} selected</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50">
                Assign Plan
              </button>
              <button className="px-3 py-1.5 bg-white border border-red-200 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedGyms.length === list.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {listLoading && (
                <tr>
                    <td colSpan="7" className="py-10">
                      <div className="flex justify-center">
                        <GymLoader label="Loading requests..." />
                      </div>
                    </td>
                  </tr>
              )}
              {list?.map((gym) => (
                <tr key={gym.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedGyms.includes(gym.id)}
                      onChange={() => handleSelectGym(gym.id)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        <img src={`http://localhost/GymsBackend/${gym?.logo}`} alt="Gym Logo" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{gym.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{gym.ownerName}</p>
                    <p className="text-xs text-slate-500">{gym.ownerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${planColors[gym.plan]}`}>
                      {gym.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[gym.status]}`}>
                      {gym.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{gym.members}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{gym.revenue}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">Showing 1 to 6 of 344 gyms</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Previous
            </button>
            <button className="w-8 h-8 bg-indigo-600 text-white rounded-lg text-sm font-medium">1</button>
            <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">2</button>
            <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">3</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Gyms;