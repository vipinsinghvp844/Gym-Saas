import { X } from 'lucide-react';



const CreateNotificationModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Create Notification</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Notification Details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notification Title *
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter notification title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message *
              </label>
              <textarea
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                placeholder="Enter notification message"
                required
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Send To *
              </label>
              <select className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="all">All Members</option>
                <option value="active">Active Members Only</option>
                <option value="expired">Expired Memberships</option>
                <option value="premium">Premium Members</option>
                <option value="basic">Basic Members</option>
              </select>
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notification Type *
              </label>
              <select className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="info">Information</option>
                <option value="reminder">Reminder</option>
                <option value="promotion">Promotion</option>
                <option value="alert">Alert</option>
              </select>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Delivery Method *
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                    defaultChecked
                  />
                  <span className="text-sm text-slate-700">Push Notification</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-700">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-700">SMS</span>
                </label>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-slate-700">Schedule for later</span>
              </label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <input
                  type="date"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="time"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotificationModal;