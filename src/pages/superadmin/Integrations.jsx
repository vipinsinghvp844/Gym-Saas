import { Plug, CreditCard, FileText, Megaphone} from 'lucide-react';


const Integrations = () => {
  const integrations = [
    { name: 'Stripe', description: 'Payment processing', status: 'Connected', icon: CreditCard, color: 'indigo' },
    { name: 'SendGrid', description: 'Email delivery', status: 'Connected', icon: FileText, color: 'blue' },
    { name: 'Slack', description: 'Team notifications', status: 'Not Connected', icon: Megaphone, color: 'purple' },
    { name: 'Zapier', description: 'Workflow automation', status: 'Not Connected', icon: Plug, color: 'orange' },
  ];

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Integrations</h1>
        <p className="text-sm text-slate-500 mt-1">Connect third-party services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, idx) => {
          const Icon = integration.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${integration.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${integration.color}-600`} />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${integration.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {integration.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{integration.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
              <button className={`w-full h-10 rounded-lg text-sm font-medium ${integration.status === 'Connected' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                {integration.status === 'Connected' ? 'Configure' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Integrations;