import { Plus, Search, Eye, Edit, Trash2, Copy, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import CreatePlanModal from '../../../components/ui/CreatePlanModal';

const GymMembershipPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: '1',
      name: 'Basic Monthly',
      price: 49.99,
      duration: '1 month',
      features: ['Gym access', 'Locker', '2 classes/week'],
      maxClasses: 8,
      status: 'Active',
      subscribers: 142,
      revenue: 7098.58,
    },
    {
      id: '2',
      name: 'Premium Monthly',
      price: 79.99,
      duration: '1 month',
      features: ['Full access', 'Personal locker', 'Unlimited classes', '1 PT session/month'],
      maxClasses: null,
      status: 'Active',
      subscribers: 98,
      revenue: 7839.02,
    },
    {
      id: '3',
      name: 'VIP Annual',
      price: 899.99,
      duration: '12 months',
      features: ['VIP access', 'Private locker', 'Unlimited classes', '4 PT sessions/month', 'Nutrition plan'],
      maxClasses: null,
      status: 'Active',
      subscribers: 34,
      revenue: 30599.66,
    },
    {
      id: '4',
      name: 'Student Plan',
      price: 29.99,
      duration: '1 month',
      features: ['Gym access', 'Shared locker', '1 class/week'],
      maxClasses: 4,
      status: 'Active',
      subscribers: 67,
      revenue: 2009.33,
    },
    {
      id: '5',
      name: 'Family Plan',
      price: 149.99,
      duration: '1 month',
      features: ['Access for 4', 'Family locker', '12 classes/week total'],
      maxClasses: 12,
      status: 'Inactive',
      subscribers: 0,
      revenue: 0,
    },
  ];

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-slate-100 text-slate-700',
  };

  const handleCreatePlan = (planData) => {
    console.log('Creating plan:', planData);
  };

  const handleDeletePlan = () => {
    console.log('Deleting plan:', selectedPlan);
    setShowDeleteModal(false);
    setSelectedPlan(null);
  };

  const handleToggleStatus = (plan) => {
    console.log('Toggling status for:', plan);
  };

  const handleDuplicatePlan = (plan) => {
    console.log('Duplicating plan:', plan);
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Membership Plans</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage membership plans for your gym
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Plans</p>
          <p className="text-2xl font-semibold text-slate-900">5</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active Plans</p>
          <p className="text-2xl font-semibold text-slate-900">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Subscribers</p>
          <p className="text-2xl font-semibold text-slate-900">341</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-semibold text-slate-900">$47.5K</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search plans by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Plan Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.duration}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusColors[plan.status]
                  }`}
                >
                  {plan.status}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                <span className="text-sm text-slate-500">/
                  {plan.duration.includes('month') ? 'mo' : 'yr'}
                </span>
              </div>
            </div>

            {/* Plan Features */}
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Features</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1 h-1 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Plan Stats */}
            <div className="p-6 border-b border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Subscribers</p>
                  <p className="text-lg font-semibold text-slate-900">{plan.subscribers}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Revenue</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${plan.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center gap-2">
              <button
                onClick={() => handleToggleStatus(plan)}
                className="flex-1 h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center justify-center gap-2"
                title={plan.status === 'Active' ? 'Deactivate' : 'Activate'}
              >
                {plan.status === 'Active' ? (
                  <ToggleRight className="w-4 h-4" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => handleDuplicatePlan(plan)}
                className="flex-1 h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center justify-center gap-2"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                className="flex-1 h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center justify-center gap-2"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowDeleteModal(true);
                }}
                className="flex-1 h-9 px-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium text-red-700 flex items-center justify-center gap-2"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePlan}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPlan(null);
        }}
        onConfirm={handleDeletePlan}
        title="Delete Plan"
        message={`Are you sure you want to delete "${selectedPlan?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}


export default GymMembershipPlans;