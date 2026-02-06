import { Plus, Search, Eye, Edit, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import CreateAnnouncementModal from '../../../components/ui/CreateAnnouncementModal';

const GymAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const announcements = [
    { id: '1', title: 'New Yoga Classes Starting Monday', content: 'Join our new morning yoga sessions starting this Monday at 6:00 AM...', audience: 'All Members', date: 'Feb 1, 2024', status: 'Published', views: 124 },
    { id: '2', title: 'Gym Maintenance Schedule', content: 'The gym will be closed for maintenance on Sunday, Feb 5th...', audience: 'All Members', date: 'Jan 28, 2024', status: 'Published', views: 256 },
    { id: '3', title: 'Holiday Hours', content: 'Please note our special hours during the upcoming holiday...', audience: 'All Members', date: 'Jan 25, 2024', status: 'Published', views: 189 },
    { id: '4', title: 'New Membership Perks', content: 'Premium members now get access to exclusive workshops...', audience: 'Premium Members', date: 'Jan 20, 2024', status: 'Published', views: 98 },
  ];

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage gym announcements for members
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Announcements</p>
          <p className="text-2xl font-semibold text-slate-900">28</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Published</p>
          <p className="text-2xl font-semibold text-slate-900">24</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Views</p>
          <p className="text-2xl font-semibold text-slate-900">2.4K</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Engagement</p>
          <p className="text-2xl font-semibold text-slate-900">86%</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{announcement.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{announcement.content}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold ml-4">
                {announcement.status}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{announcement.audience}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{announcement.views} views</span>
              </div>
              <span>{announcement.date}</span>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button className="h-9 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="h-9 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="h-9 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateAnnouncementModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={(data) => console.log('Save announcement:', data)}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => console.log('Delete announcement')}
        type="danger"
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default GymAnnouncements;