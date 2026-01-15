import { DollarSign, Download, Plus, CreditCard, Receipt, FileText, Megaphone} from 'lucide-react';



const Announcements = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage platform announcements</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Announcement management interface</p>
      </div>
    </div>
  );
}

export default Announcements;