import { X } from 'lucide-react';
import { useState } from 'react';


const CreateRoleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      members: { view: false, create: false, edit: false, delete: false },
      trainers: { view: false, create: false, edit: false, delete: false },
      staff: { view: false, create: false, edit: false, delete: false },
      classes: { view: false, create: false, edit: false, delete: false },
      schedules: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handlePermissionChange = (module, action, checked) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module  ],
          [action]: checked,
        },
      },
    });
  };

  const permissionModules = [
    { key: 'members', label: 'Members', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'trainers', label: 'Trainers', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'staff', label: 'Staff', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'classes', label: 'Classes', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'schedules', label: 'Schedules', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'reports', label: 'Reports', actions: ['view', 'create', 'edit', 'delete'] },
    { key: 'settings', label: 'Settings', actions: ['view', 'edit'] },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-slate-900">Create Role</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Front Desk Staff, Senior Trainer"
                required
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role's responsibilities..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Permissions */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-4">Permissions</h3>
              <div className="space-y-4">
                {permissionModules.map((module) => (
                  <div
                    key={module.key}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <h4 className="text-sm font-medium text-slate-900 mb-3">{module.label}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {module.actions.map((action) => (
                        <label
                          key={action}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              formData.permissions[
                                module.key 
                              ]?.[action ] || false
                            }
                            onChange={(e) =>
                              handlePermissionChange(module.key, action, e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="text-sm text-slate-700 capitalize">{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default CreateRoleModal;