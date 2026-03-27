import {
    Plus,
    Download,
    Search,
    Eye,
    Edit,
    Ban,
    Mail,
    Phone
} from 'lucide-react';
import { useEffect, useState } from 'react';
import TablePagination from '../../../components/ui/TablePagination';
import api from '../../../services/api'; // axios wrapper
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/ui/Avatar';
import GymLoader from '../../../components/ui/GymLoader';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import GlobalPreviewModal from '../../../components/ui/GlobalPreviewModal';

const GymMembers = () => {
    const [members, setMembers] = useState([]);
    const [stats, setStats] = useState(0);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const navigate = useNavigate();
    const [selectedMember, setSelectedMember] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    /* ==========================
       🔄 FETCH MEMBERS
    ========================== */
    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/gymadmin/members/list.php', {
                params: {
                    page: pagination.page,
                    limit: pagination.limit,
                    search: searchTerm || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                },
            });

            if (res.data.status) {
                setMembers(res.data.data);
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.pagination.total,
                    totalPages: res.data.pagination.total_pages,
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    /* ==========================
       🔄 FETCH STATS
    ========================== */
    useEffect(() => {
        api.get("/gymadmin/members/stats.php").then(res => {
            if (res.data.status) setStats(res.data.data);
        });
    }, []);

    /*===========================
        Previw model data
    ============================= */
    const openPreview = async (memberId) => {
        setShowPreviewModal(true);
        try {
            const res = await api.get("/gymadmin/members/show.php", {
                params: { id: memberId }
            });

            if (res.data.status) {
                const d = res.data.data;
                setPreviewData(d);
            }
        } catch {
            alert("Failed to load member preview");
        }
    };
    /* ==========================
       ⏱ DELETE MEMBER
    ========================== */
    const deleteMember = async () => {
  await api.post("/gymadmin/members/delete.php", {
    id: selectedMember.id
  });
  fetchMembers();
};


    /* ==========================
       ⏱ DEBOUNCE SEARCH
    ========================== */
    useEffect(() => {
        const t = setTimeout(() => {
            setPagination((p) => ({ ...p, page: 1 }));
            fetchMembers();
        }, 400);
        return () => clearTimeout(t);
    }, [searchTerm, statusFilter]);

    useEffect(() => {
        fetchMembers();
    }, [pagination.page, pagination.limit]);

    /* ==========================
       🎨 HELPERS
    ========================== */
    const planColors = {
        Basic: 'bg-blue-100 text-blue-700',
        Premium: 'bg-purple-100 text-purple-700',
        VIP: 'bg-indigo-100 text-indigo-700',
    };

    const statusColors = {
        active: 'bg-green-100 text-green-700',
        expired: 'bg-red-100 text-red-700',
        suspended: 'bg-amber-100 text-amber-700',
    };

    return (
        <div className="space-y-6 p-5">

            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Members</h1>
                    <p className="text-sm text-slate-500">Manage gym members</p>
                </div>
                <button
                    onClick={() => navigate("/gym/members/create")}
                    className="h-10 px-4 bg-purple-600 text-white rounded-lg flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Member
                </button>

            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Total Members</p>
                    <p className="text-2xl font-semibold text-slate-900">{stats?.total_members ?? "—"}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Active Members</p>
                    <p className="text-2xl font-semibold text-slate-900">{stats?.active_members ?? "—"}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">New This Month</p>
                    <p className="text-2xl font-semibold text-slate-900">{stats?.new_this_month ?? "—"}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-sm text-slate-600 mb-1">Expiring Soon</p>
                    <p className="text-2xl font-semibold text-slate-900">{stats?.expiring_soon ?? "—"}</p>
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

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Member</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-200'>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                        <GymLoader />
                                    </td>
                                </tr>
                            )}
                            {!loading && members.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                        No members found
                                    </td>
                                </tr>
                            )}
                            {!loading &&
                                members.map((m) => (
                                    <tr key={m.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    firstName={m.first_name}
                                                    lastName={m.last_name}
                                                    image={m.avatar}
                                                    size={40}
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {m.first_name} {m.last_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">#{m.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex gap-2 items-center">
                                                <Mail className="w-3 h-3" /> {m.email}
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <Phone className="w-3 h-3" /> {m.phone}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs ${planColors[m.plan_name]}`}>
                                                {m.plan_name || "—"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs ${statusColors[m.status]}`}>
                                                {m.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm">
                                            {new Date(m.joined_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <Eye
                                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600"
                                                    onClick={() => openPreview(m.id)}
                                                />

                                                <Edit
                                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600"
                                                    onClick={() => navigate(`/gym/members/${m.id}/edit`)}
                                                />

                                                <Ban
                                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-600"
                                                    onClick={() => {
                                                        setSelectedMember(m);
                                                        setShowSuspendModal(true);
                                                    }}
                                                />
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <TablePagination
                    page={pagination.page}
                    limit={pagination.limit}
                    total={pagination.total}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
                    onLimitChange={(limit) =>
                        setPagination((p) => ({ ...p, limit, page: 1 }))
                    }
                />
            </div>
            <GlobalPreviewModal
                isOpen={showPreviewModal}
                onClose={() => {
                    setShowPreviewModal(false);
                    setSelectedMember(null);
                }}
                type="member"
                data={previewData}
            />


            <ConfirmationModal
                isOpen={showSuspendModal}
                onClose={() => {
                    setShowSuspendModal(false);
                    setSelectedMember(null);
                }}
                onConfirm={async () => {
                    try {
                        await api.post("/gymadmin/members/delete.php", {
                            member_id: selectedMember.id,
                        });
                        setShowSuspendModal(false);
                        setSelectedMember(null);
                        fetchMembers(); // refresh list
                    } catch {
                        alert("Failed to suspend member");
                    }
                }}
                type="warning"
                title="Suspend Member"
                message={`Are you sure you want to suspend ${selectedMember?.first_name}?`}
                confirmText="Suspend"
                cancelText="Cancel"
            />

        </div>
    );
};

export default GymMembers;
