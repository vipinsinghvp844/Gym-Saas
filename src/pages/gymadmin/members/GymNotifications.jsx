import { Plus, Search, Bell, BellOff, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateNotificationModal from '../../../components/ui/CreateNotificationModal';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

 const GymNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const notifications = [
    { id: '1', title: 'Class Reminder', message: 'Your Yoga class starts in 30 minutes', type: 'Reminder', audience: 'Class Members', status: 'Enabled', sentCount: 45, clickRate: '72%' },
    { id: '2', title: 'Membership Expiring Soon', message: 'Your membership expires in 7 days. Renew now!', type: 'Alert', audience: 'Expiring Members', status: 'Enabled', sentCount: 34, clickRate: '65%' },
    { id: '3', title: 'New Class Available', message: 'Check out our new HIIT class every Tuesday!', type: 'Promotion', audience: 'All Members', status: 'Enabled', sentCount: 542, clickRate: '48%' },
    { id: '4', title: 'Daily Motivation', message: 'Don\'t skip your workout today!', type: 'Info', audience: 'All Members', status: 'Disabled', sentCount: 0, clickRate: '-' },
  ];

  const typeColors = {
    Reminder: 'bg-blue-100 text-blue-700',
    Alert: 'bg-amber-100 text-amber-700',
    Promotion: 'bg-purple-100 text-purple-700',
    Info: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage automated notifications and reminders for members
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Notification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Notifications</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Enabled</p>
          <p className="text-2xl font-semibold text-slate-900">9</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Sent</p>
          <p className="text-2xl font-semibold text-slate-900">1.2K</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Click Rate</p>
          <p className="text-2xl font-semibold text-slate-900">64%</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Notification</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Audience</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Sent</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Click Rate</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{notification.message}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[notification.type]}`}>
                    {notification.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{notification.audience}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-900">{notification.sentCount}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{notification.clickRate}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.status === 'Enabled' ? 'bg-green-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-sm text-slate-700">{notification.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button 
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600"
                      title={notification.status === 'Enabled' ? 'Disable' : 'Enable'}
                    >
                      {notification.status === 'Enabled' ? (
                        <BellOff className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <CreateNotificationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={(data) => console.log('Save notification:', data)}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => console.log('Delete notification')}
        type="danger"
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}


export default GymNotifications;