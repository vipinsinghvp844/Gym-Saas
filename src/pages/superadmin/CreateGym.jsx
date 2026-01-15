import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { createGym } from "../../../redux/actions/gymAction";
import { Save, X, Upload } from 'lucide-react';

const CreateGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creating } = useSelector((state) => state.gym);
  const [gymform, setGymForm] = useState({
    gym_name: "",
    gym_email: "",
    gym_phone: "",
    gym_address: "",
    gym_city: "",
    gym_state: "",
    gym_zip: "",
  });
  const [logoFile, setLogoFile] = useState(null);

  const [ownerForm, setOwnerForm] = useState({
    owner_firstName: "",
    owner_LastName: "",
    owner_email: "",
    owner_phone: "",
  });
  const [plan, setPlan] = useState("");
  const [trialDays, setTrialDays] = useState(0);
  const [status, setStatus] = useState("active");
  const [settings, setSettings] = useState({
    send_welcome_email: true,
    auto_approve_members: false,
    enable_notifications: true,
  });

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("gym", JSON.stringify(gymform));
    formData.append("owner", JSON.stringify(ownerForm));
    formData.append("plan", plan);
    formData.append("trial_days", trialDays);
    formData.append("status", status);

    formData.append("settings", JSON.stringify(settings));

    if (logoFile) {
    formData.append("logo", logoFile); 
  }

    const res = dispatch(createGym(formData, navigate));
  };

  return (
    <form onSubmit={submit} className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create Gym</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add a new gym to the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={creating}
            className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            {creating ? "Creating..." : "Create Gym"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gym Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter gym name"
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) =>
                    setGymForm({ ...gymform, gym_name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="gym@example.com"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setGymForm({ ...gymform, gym_email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setGymForm({ ...gymform, gym_phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) =>
                    setGymForm({ ...gymform, gym_address: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setGymForm({ ...gymform, gym_city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setGymForm({ ...gymform, gym_state: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setGymForm({ ...gymform, gym_zip: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Owner Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Owner First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setOwnerForm({
                        ...ownerForm,
                        owner_firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Owner Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) =>
                      setOwnerForm({
                        ...ownerForm,
                        owner_firstName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Owner Email *
                </label>
                <input
                  type="email"
                  placeholder="owner@example.com"
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) =>
                    setOwnerForm({
                      ...ownerForm,
                      owner_email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Owner Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) =>
                    setOwnerForm({
                      ...ownerForm,
                      owner_phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Subscription Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Plan *
                </label>
                <select
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Select a plan</option>
                  <option value="free">Free</option>
                  <option value="basic">Basic - $49/month</option>
                  <option value="pro">Pro - $99/month</option>
                  <option value="enterprise">Enterprise - $299/month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Trial Period
                </label>
                <select
                  onChange={(e) => setTrialDays(e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="0">No trial</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Gym Logo</h3>
            <label className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer block">
              <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              Upload logo
            </label>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Status</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                  className="w-4 h-4 text-indigo-600"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">Active</p>
                  <p className="text-xs text-slate-500">Gym is active and accessible</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                  className="w-4 h-4 text-indigo-600"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">Inactive</p>
                  <p className="text-xs text-slate-500">Gym is temporarily disabled</p>
                </div>
              </label>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Settings
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">
                  Send welcome email
                </span>
                <input
                  type="checkbox"
                  checked={settings.send_welcome_email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      send_welcome_email: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">
                  Auto-approve members
                </span>
                <input
                  type="checkbox"
                  checked={settings.auto_approve_members}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      auto_approve_members: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">
                  Enable notifications
                </span>
                <input
                  type="checkbox"
                  checked={settings.enable_notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enable_notifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}

export default CreateGym;