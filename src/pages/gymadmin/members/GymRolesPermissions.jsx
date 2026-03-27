import { Plus, Edit, Trash2, Shield, Users, Eye } from 'lucide-react';
import { useState } from 'react';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import CreateRoleModal from '../../../components/ui/CreateRoleModal';


const GymRolesPermissions = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: '1',
      name: 'Gym Manager',
      description: 'Full access to all gym operations',
      userCount: 2,
      isSystem: true,
      permissions: {
        members: { view: true, create: true, edit: true, delete: true },
        trainers: { view: true, create: true, edit: true, delete: true },
        staff: { view: true, create: true, edit: true, delete: true },
        classes: { view: true, create: true, edit: true, delete: true },
        schedules: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, edit: true },
      },
    },
    {
      id: '2',
      name: 'Front Desk',
      description: 'Handle member check-ins and basic operations',
      userCount: 5,
      isSystem: false,
      permissions: {
        members: { view: true, create: true, edit: true, delete: false },
        trainers: { view: true, create: false, edit: false, delete: false },
        staff: { view: true, create: false, edit: false, delete: false },
        classes: { view: true, create: false, edit: true, delete: false },
        schedules: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
      },
    },
    {
      id: '3',
      name: 'Senior Trainer',
      description: 'Manage classes, schedules, and view reports',
      userCount: 3,
      isSystem: false,
      permissions: {
        members: { view: true, create: false, edit: false, delete: false },
        trainers: { view: true, create: false, edit: false, delete: false },
        staff: { view: true, create: false, edit: false, delete: false },
        classes: { view: true, create: true, edit: true, delete: false },
        schedules: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
      },
    },
    {
      id: '4',
      name: 'Trainer',
      description: 'View schedules and manage assigned classes',
      userCount: 8,
      isSystem: false,
      permissions: {
        members: { view: true, create: false, edit: false, delete: false },
        trainers: { view: true, create: false, edit: false, delete: false },
        staff: { view: false, create: false, edit: false, delete: false },
        classes: { view: true, create: false, edit: true, delete: false },
        schedules: { view: true, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
      },
    },
  ];

  const handleCreateRole = (roleData) => {
    console.log('Creating role:', roleData);
  };

  const handleDeleteRole = () => {
    console.log('Deleting role:', selectedRole);
    setShowDeleteModal(false);
    setSelectedRole(null);
  };

  const getPermissionCount = (permissions) => {
    let count = 0;
    Object.values(permissions).forEach((module) => {
      count += Object.values(module).filter((val) => val === true).length;
    });
    return count;
  };

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Roles & Permissions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage gym-level roles and access permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Roles</p>
          <p className="text-2xl font-semibold text-slate-900">{roles.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Custom Roles</p>
          <p className="text-2xl font-semibold text-slate-900">
            {roles.filter((r) => !r.isSystem).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total Users</p>
          <p className="text-2xl font-semibold text-slate-900">
            {roles.reduce((acc, role) => acc + role.userCount, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">System Roles</p>
          <p className="text-2xl font-semibold text-slate-900">
            {roles.filter((r) => r.isSystem).length}
          </p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Role Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{role.name}</h3>
                      {role.isSystem && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          System
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{role.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{role.userCount} users</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Shield className="w-4 h-4" />
                  <span>{getPermissionCount(role.permissions)} permissions</span>
                </div>
              </div>
            </div>

            {/* Permission Summary */}
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">
                Key Permissions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(role.permissions).slice(0, 6).map(([module, perms]) => {
                  const enabledPerms = Object.entries(perms)
                    .filter(([_, val]) => val === true)
                    .map(([key]) => key.charAt(0).toUpperCase());
                  
                  return (
                    <div key={module} className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs">
                      <span className="font-medium text-slate-700 capitalize">{module}</span>
                      {enabledPerms.length > 0 ? (
                        <span className="text-purple-600 font-semibold">
                          {enabledPerms.join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedRole(role);
                  setShowViewModal(true);
                }}
                className="flex-1 h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                disabled={role.isSystem}
                className="flex-1 h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                disabled={role.isSystem || role.userCount > 0}
                onClick={() => {
                  setSelectedRole(role);
                  setShowDeleteModal(true);
                }}
                className="flex-1 h-9 px-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium text-red-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              About Roles & Permissions
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  <strong>System roles</strong> cannot be edited or deleted. They are predefined by
                  the platform.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Custom roles</strong> can be created, edited, and deleted as needed for
                  your gym.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  Roles with assigned users cannot be deleted. Remove all users from the role first.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  Permission changes take effect immediately for all users with that role.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRoleModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateRole}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRole(null);
        }}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        message={`Are you sure you want to delete "${selectedRole?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />

      {/* View Details Modal */}
      {showViewModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-slate-900">{selectedRole.name}</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedRole(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-600">{selectedRole.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{selectedRole.userCount} users</span>
                  </div>
                  {selectedRole.isSystem && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      System Role
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-4">Full Permissions</h3>
              <div className="space-y-4">
                {Object.entries(selectedRole.permissions).map(([module, perms]) => (
                  <div key={module} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-sm font-medium text-slate-900 mb-3 capitalize">{module}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(perms).map(([action, enabled]) => (
                        <div key={action} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border ${
                              enabled
                                ? 'bg-purple-600 border-purple-600'
                                : 'bg-white border-slate-300'
                            } flex items-center justify-center`}
                          >
                            {enabled && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className="text-sm text-slate-700 capitalize">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default GymRolesPermissions;

// import