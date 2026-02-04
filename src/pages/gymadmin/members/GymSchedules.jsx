import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import CreateScheduleModal from '../../../components/ui/CreateScheduleModal';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const GymSchedules = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
  ];

  const schedules = [
    { id: '1', day: 'Monday', time: '06:00 AM', duration: 60, class: 'Yoga', trainer: 'Emily Rodriguez', location: 'Studio A', capacity: 20, enrolled: 18 },
    { id: '2', day: 'Monday', time: '08:00 AM', duration: 45, class: 'HIIT', trainer: 'John Smith', location: 'Main Floor', capacity: 25, enrolled: 23 },
    { id: '3', day: 'Monday', time: '06:00 PM', duration: 60, class: 'Spinning', trainer: 'David Kim', location: 'Studio B', capacity: 15, enrolled: 15 },
    { id: '4', day: 'Tuesday', time: '07:00 AM', duration: 60, class: 'Pilates', trainer: 'Emily Rodriguez', location: 'Studio A', capacity: 15, enrolled: 12 },
    { id: '5', day: 'Tuesday', time: '06:00 PM', duration: 45, class: 'CrossFit', trainer: 'John Smith', location: 'Main Floor', capacity: 20, enrolled: 19 },
    { id: '6', day: 'Wednesday', time: '06:00 AM', duration: 60, class: 'Yoga', trainer: 'Emily Rodriguez', location: 'Studio A', capacity: 20, enrolled: 17 },
    { id: '7', day: 'Wednesday', time: '07:00 PM', duration: 60, class: 'Zumba', trainer: 'Sarah Martinez', location: 'Studio B', capacity: 30, enrolled: 28 },
    { id: '8', day: 'Thursday', time: '08:00 AM', duration: 45, class: 'HIIT', trainer: 'John Smith', location: 'Main Floor', capacity: 25, enrolled: 24 },
    { id: '9', day: 'Friday', time: '06:00 AM', duration: 60, class: 'Yoga', trainer: 'Emily Rodriguez', location: 'Studio A', capacity: 20, enrolled: 19 },
    { id: '10', day: 'Friday', time: '06:00 PM', duration: 60, class: 'Spinning', trainer: 'David Kim', location: 'Studio B', capacity: 15, enrolled: 14 },
    { id: '11', day: 'Saturday', time: '09:00 AM', duration: 90, class: 'CrossFit', trainer: 'John Smith', location: 'Main Floor', capacity: 20, enrolled: 18 },
    { id: '12', day: 'Saturday', time: '11:00 AM', duration: 60, class: 'Yoga', trainer: 'Emily Rodriguez', location: 'Studio A', capacity: 20, enrolled: 16 },
  ];

  const getScheduleForDayAndTime = (day, time) => {
    return schedules.find(s => s.day === day && s.time === time);
  };

  const handleCreateSchedule = (scheduleData) => {
    console.log('Creating schedule:', scheduleData);
  };

  const handleDeleteSchedule = () => {
    console.log('Deleting schedule:', selectedSchedule);
    setShowDeleteModal(false);
    setSelectedSchedule(null);
  };

  const getCapacityColor = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Schedules</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage class schedules and bookings
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Classes</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">This Week</p>
          <p className="text-2xl font-semibold text-slate-900">56</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Bookings</p>
          <p className="text-2xl font-semibold text-slate-900">213</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg. Capacity</p>
          <p className="text-2xl font-semibold text-slate-900">89%</p>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">
              Week of Feb 3 - Feb 9, 2026
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Current Week</p>
          </div>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-slate-200">
              <div className="p-4 bg-slate-50 border-r border-slate-200">
                <p className="text-sm font-semibold text-slate-700">Time</p>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4 bg-slate-50 border-r border-slate-200 last:border-r-0">
                  <p className="text-sm font-semibold text-slate-900">{day}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {['Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9'][daysOfWeek.indexOf(day)]}
                  </p>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-slate-200 last:border-b-0">
                <div className="p-3 bg-slate-50 border-r border-slate-200 flex items-center">
                  <p className="text-xs font-medium text-slate-600">{time}</p>
                </div>
                {daysOfWeek.map((day) => {
                  const schedule = getScheduleForDayAndTime(day, time);
                  return (
                    <div
                      key={day}
                      className="p-2 border-r border-slate-200 last:border-r-0 min-h-[80px] hover:bg-slate-50 transition-colors"
                    >
                      {schedule ? (
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3 h-full group relative">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                              {schedule.class}
                            </p>
                            <p className="text-xs text-slate-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {schedule.duration} min
                            </p>
                            <p className="text-xs text-slate-600 line-clamp-1">
                              {schedule.trainer}
                            </p>
                            <p className="text-xs text-slate-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {schedule.location}
                            </p>
                            <p className={`text-xs font-medium flex items-center gap-1 ${getCapacityColor(schedule.enrolled, schedule.capacity)}`}>
                              <Users className="w-3 h-3" />
                              {schedule.enrolled}/{schedule.capacity}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              className="w-7 h-7 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700"
                              title="Edit"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setShowDeleteModal(true);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-white hover:bg-red-50 border border-slate-200 rounded text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateScheduleModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSchedule}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSchedule(null);
        }}
        onConfirm={handleDeleteSchedule}
        title="Delete Schedule"
        message={`Are you sure you want to delete this schedule? This will cancel all bookings for this class.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}


export default GymSchedules;