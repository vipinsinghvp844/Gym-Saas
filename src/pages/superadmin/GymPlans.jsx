import { Check, Plus } from 'lucide-react';

const GymPlans = () => {
  const plans = [
    { 
      name: 'Free', 
      price: '$0', 
      period: 'forever',
      features: ['Up to 50 members', 'Basic reporting', 'Email support', '1 location'],
      popular: false,
      color: 'slate'
    },
    { 
      name: 'Basic', 
      price: '$49', 
      period: 'per month',
      features: ['Up to 200 members', 'Advanced reporting', 'Priority email support', '3 locations', 'Custom branding'],
      popular: false,
      color: 'blue'
    },
    { 
      name: 'Pro', 
      price: '$99', 
      period: 'per month',
      features: ['Up to 1000 members', 'Advanced analytics', 'Phone & email support', 'Unlimited locations', 'Custom branding', 'API access'],
      popular: true,
      color: 'indigo'
    },
    { 
      name: 'Enterprise', 
      price: '$299', 
      period: 'per month',
      features: ['Unlimited members', 'Enterprise analytics', '24/7 priority support', 'Unlimited locations', 'White-label solution', 'API access', 'Dedicated account manager'],
      popular: false,
      color: 'purple'
    },
  ];

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Gym Plans</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage subscription plans for gyms
          </p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Plans</p>
          <p className="text-2xl font-semibold text-slate-900">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-900">344</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className={`bg-white rounded-xl border-2 ${plan.popular ? 'border-indigo-600' : 'border-slate-200'} shadow-sm overflow-hidden`}>
            {plan.popular && (
              <div className="bg-indigo-600 text-white text-center py-2 text-xs font-semibold">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full h-10 rounded-lg text-sm font-medium transition-colors ${
                plan.popular 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default GymPlans;