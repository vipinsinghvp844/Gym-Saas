import { UserPlus, Download, Search, Filter, UserCheck } from 'lucide-react';
import { useState } from 'react';
import ManualCheckInModal from '../../../components/ui/ManualCheckinModal';

const GymCheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const checkIns = [
    { id: '1', member: 'Alex Thompson', membershipType: 'Premium', checkInTime: '8:45 AM', purpose: 'Gym Workout', status: 'Active' },
    { id: '2', member: 'Sarah Wilson', membershipType: 'Basic', checkInTime: '8:30 AM', purpose: 'Yoga Class', status: 'Active' },
    { id: '3', member: 'Mike Brown', membershipType: 'Premium', checkInTime: '8:15 AM', purpose: 'Personal Training', status: 'Active' },
    { id: '4', member: 'Emma Davis', membershipType: 'VIP', checkInTime: '8:00 AM', purpose: 'Gym Workout', status: 'Active' },
    { id: '5', member: 'James Miller', membershipType: 'Premium', checkInTime: '7:45 AM', purpose: 'HIIT Class', status: 'Checked Out' },
    { id: '6', member: 'Lisa Chen', membershipType: 'Basic', checkInTime: '7:30 AM', purpose: 'Gym Workout', status: 'Checked Out' },
  ];

  const todayStats = {
    totalCheckIns: 87,
    currentlyInside: 34,
    avgDuration: '68 min',
    peakHour: '6:00 PM'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Check-ins</h1>
          <p className="text-sm text-slate-500 mt-1">
            Live member check-ins and attendance tracking
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setShowCheckInModal(true)}
            className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Manual Check-in
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Today's Check-ins</p>
          <p className="text-2xl font-semibold text-slate-900">{todayStats.totalCheckIns}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Currently Inside</p>
          <p className="text-2xl font-semibold text-slate-900">{todayStats.currentlyInside}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Duration</p>
          <p className="text-2xl font-semibold text-slate-900">{todayStats.avgDuration}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Peak Hour</p>
          <p className="text-2xl font-semibold text-slate-900">{todayStats.peakHour}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by member name or membership type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Live Check-ins Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Recent Check-ins</h3>
          <p className="text-sm text-slate-500 mt-1">Live updates from member check-ins</p>
        </div>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Membership</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-in Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {checkIns.map((checkIn) => (
                <tr key={checkIn.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                        {checkIn.member.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{checkIn.member}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      checkIn.membershipType === 'Premium' ? 'bg-purple-100 text-purple-700' :
                      checkIn.membershipType === 'VIP' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {checkIn.membershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{checkIn.checkInTime}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{checkIn.purpose}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        checkIn.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'
                      }`} />
                      <span className="text-sm text-slate-700">{checkIn.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ManualCheckInModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        onCheckIn={(memberId) => console.log('Check in member:', memberId)}
      />
    </div>
  );
}

export default GymCheckIn;