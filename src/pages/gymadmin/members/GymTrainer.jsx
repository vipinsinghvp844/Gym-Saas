import { Plus, Download, Search, Eye, Edit, Ban, Star } from 'lucide-react';
import { useState } from 'react';

const GymTrainers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const trainers = [
    { id: '1', name: 'John Smith', email: 'john.trainer@powerfit.com', specialty: 'Strength Training', rating: 4.9, classes: 24, members: 45, status: 'Active' },
    { id: '2', name: 'Lisa Williams', email: 'lisa.trainer@powerfit.com', specialty: 'Yoga & Pilates', rating: 4.8, classes: 18, members: 38, status: 'Active' },
    { id: '3', name: 'Mike Davis', email: 'mike.trainer@powerfit.com', specialty: 'HIIT & Cardio', rating: 4.7, classes: 22, members: 52, status: 'Active' },
    { id: '4', name: 'Sarah Chen', email: 'sarah.trainer@powerfit.com', specialty: 'Spin & Cycling', rating: 4.9, classes: 20, members: 41, status: 'Active' },
  ];

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Trainers</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your gym trainers and instructors
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Trainer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Trainers</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Trainers</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Avg Rating</p>
          <p className="text-2xl font-semibold text-slate-900">4.8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Classes</p>
          <p className="text-2xl font-semibold text-slate-900">84</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search trainers by name, email, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-900">Gym Admin Access</p>
            <p className="text-sm text-purple-700 mt-1">
              As a Gym Admin, you can add, edit, and manage all trainers for your gym. 
              Super Admins do not have direct access to trainer management.
            </p>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {trainer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{trainer.name}</h3>
                    <p className="text-xs text-slate-500">{trainer.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Specialty</p>
                  <p className="text-sm font-medium text-slate-900">{trainer.specialty}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-900">{trainer.rating}</span>
                  <span className="text-xs text-slate-500 ml-1">rating</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Classes</p>
                  <p className="text-lg font-semibold text-slate-900">{trainer.classes}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Members</p>
                  <p className="text-lg font-semibold text-slate-900">{trainer.members}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 h-9 px-3 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="h-9 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="h-9 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 flex items-center justify-center">
                  <Ban className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default GymTrainers;

//