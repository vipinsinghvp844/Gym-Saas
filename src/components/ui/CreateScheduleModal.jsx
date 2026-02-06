import { X } from 'lucide-react';
import { useState } from 'react';

const CreateScheduleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    className: '',
    trainer: '',
    dayOfWeek: 'monday',
    startTime: '',
    endTime: '',
    maxCapacity: '',
    location: '',
    recurring: true,
    startDate: '',
    endDate: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Create Schedule</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Class Name *
            </label>
            <select
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              required
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Select class</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="Spinning">Spinning</option>
              <option value="Pilates">Pilates</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Zumba">Zumba</option>
            </select>
          </div>

          {/* Trainer */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Trainer *
            </label>
            <select
              value={formData.trainer}
              onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
              required
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Select trainer</option>
              <option value="John Smith">John Smith</option>
              <option value="Emily Rodriguez">Emily Rodriguez</option>
              <option value="David Kim">David Kim</option>
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Day of Week *
            </label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              required
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
          </div>

          {/* Location & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="">Select location</option>
              <option value="Studio A">Studio A</option>
              <option value="Studio B">Studio B</option>
              <option value="Main Floor">Main Floor</option>
              <option value="Outdoor Area">Outdoor Area</option>
            </select>

            <input
              type="number"
              value={formData.maxCapacity}
              onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
              placeholder="20"
              min="1"
              required
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
          </div>

          {/* Recurring */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.recurring}
              onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
            />
            <span className="text-sm">Recurring weekly schedule</span>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button type="button" onClick={onClose} className="h-10 px-4 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="h-10 px-4 bg-purple-600 text-white rounded-lg">
              Create Schedule
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


export default CreateScheduleModal;