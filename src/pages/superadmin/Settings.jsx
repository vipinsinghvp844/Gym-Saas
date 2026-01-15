import { Settings as SettingsIcon, FileCheck, Plug } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure platform settings</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <nav className="space-y-1">
            {['General', 'Security', 'Email', 'Payment', 'API', 'Advanced'].map((item, idx) => (
              <button key={idx} className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors ${idx === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">General Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Platform Name</label>
              <input type="text" defaultValue="GymSaaS" className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
              <input type="email" defaultValue="support@gymsaas.com" className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
              <select className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="h-10 px-6 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;