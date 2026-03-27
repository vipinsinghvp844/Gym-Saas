import { Plus, Search, Eye, Edit, Users, Calendar, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import GlobalPreviewModal from '../../../components/ui/GlobalPreviewModal';
import api from '../../../services/api';
import GymLoader from '../../../components/ui/GymLoader';
import ClassMembersDrawer from '../../../components/ui/ClassMembersDrawer';


const GymClasses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showMembersDrawer, setShowMembersDrawer] = useState(false);


  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gymadmin/classes/list.php", {
        params: {
          search: searchTerm || undefined
        }
      });

      if (res.data.status) {
        const formattedClasses = res.data.data.map(classItem => ({
          id: classItem.id,
          name: classItem.name,
          trainer: classItem.trainer,
          schedule: classItem.schedule,
          duration: classItem.duration,
          capacity: classItem.capacity,
          enrolled: classItem.enrolled,
          status: classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)
        }));

        setClasses(formattedClasses);
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching classes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [searchTerm]);

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Classes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage gym classes and schedules
          </p>
        </div>
        <button
          onClick={() => navigate('create-class')}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Class
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Classes</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total_classes || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Classes</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.active_classes || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Enrollment</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total_enrollment || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Capacity</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.avg_capacity || 0}%</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search classes by name, trainer, or schedule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && (
          <div className="col-span-full flex items-center justify-center py-12">
            <GymLoader />
          </div>
        )}

        {!loading && classes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500">No classes found</p>
          </div>
        )}

        {!loading && classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{classItem.name}</h3>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {classItem.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600">Trainer: {classItem.trainer}</p>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{classItem.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{classItem.duration} min duration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>Capacity</span>
                  <span>{Math.round((classItem.enrolled / classItem.capacity) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedClass(classItem.id);
                    setShowMembersDrawer(true);
                  }}
                  className="flex-1 h-9 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => navigate('edit-class')}
                  className="h-9 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <GlobalPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        type="class"
      />
      <ClassMembersDrawer
        isOpen={showMembersDrawer}
        onClose={() => setShowMembersDrawer(false)}
        classId={selectedClass}
      />


      <ConfirmationModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={() => console.log('Deactivate class')}
        type="warning"
        title="Deactivate Class"
        message="Are you sure you want to deactivate this class? Enrolled members will be notified."
        confirmText="Deactivate"
        cancelText="Cancel"
      />
    </div>
  );
}


export default GymClasses;