import { X, Search, UserCheck } from 'lucide-react';
import { useState } from 'react';

const ManualCheckInModal = ({ isOpen, onClose, onCheckIn }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const members = [
    { id: '1', name: 'Alex Thompson', membership: 'Premium', status: 'Active' },
    { id: '2', name: 'Sarah Wilson', membership: 'Basic', status: 'Active' },
    { id: '3', name: 'Mike Brown', membership: 'Premium', status: 'Active' },
    { id: '4', name: 'Emma Davis', membership: 'VIP', status: 'Active' },
    { id: '5', name: 'James Miller', membership: 'Basic', status: 'Active' },
  ];

  const handleCheckIn = (memberId) => {
    onCheckIn(memberId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Manual Check-In</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          </div>
        </div>

        {/* Members */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-600">
                      {member.membership} - {member.status}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckIn(member.id)}
                  className="h-8 px-3 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Check In
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManualCheckInModal;
