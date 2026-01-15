import { DollarSign, Download, Plus, CreditCard, Receipt, FileText } from 'lucide-react';



const EmailTemplates = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Email Templates</h1>
          <p className="text-sm text-slate-500 mt-1">Manage email templates</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">Email template editor</p>
      </div>
    </div>
  );
}


export default EmailTemplates;