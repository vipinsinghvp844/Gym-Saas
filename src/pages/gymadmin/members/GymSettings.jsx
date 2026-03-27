import { Save, Building2, Clock, MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter, Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const GymSettings = () =>{
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    gymName: 'PowerFit Gym',
    description: 'A modern fitness facility focused on strength training and wellness',
    email: 'info@powerfit.com',
    phone: '+1 (555) 123-4567',
    website: 'www.powerfit.com',
    address: '123 Fitness Street, San Francisco, CA 94102',
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '06:00', close: '22:00', closed: false },
    tuesday: { open: '06:00', close: '22:00', closed: false },
    wednesday: { open: '06:00', close: '22:00', closed: false },
    thursday: { open: '06:00', close: '22:00', closed: false },
    friday: { open: '06:00', close: '22:00', closed: false },
    saturday: { open: '08:00', close: '20:00', closed: false },
    sunday: { open: '08:00', close: '18:00', closed: false },
  });

  const [socialMedia, setSocialMedia] = useState({
    instagram: '@powerfit_gym',
    facebook: 'PowerFitGym',
    twitter: '@powerfitgym',
  });

  const [facilitySettings, setFacilitySettings] = useState({
    maxCapacity: 250,
    lockerCount: 120,
    showerCount: 16,
    parkingSpots: 50,
    wifiAvailable: true,
    towelService: true,
    lockerRental: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    sendWelcomeEmail: true,
    sendRenewalReminders: true,
    reminderDaysBefore: 7,
    sendClassReminders: true,
    classReminderHours: 2,
    sendMonthlyReports: true,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Settings saved');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'hours', label: 'Business Hours' },
    { id: 'facility', label: 'Facility' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'social', label: 'Social Media' },
  ];

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Gym Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure your gym settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Gym Information</h3>
                
                {/* Logo Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Gym Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </button>
                      <p className="text-xs text-slate-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Gym Name *
                    </label>
                    <input
                      type="text"
                      value={generalSettings.gymName}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, gymName: e.target.value })
                      }
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, email: e.target.value })
                        }
                        className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={generalSettings.phone}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, phone: e.target.value })
                        }
                        className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={generalSettings.website}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, website: e.target.value })
                        }
                        className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={generalSettings.description}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      value={generalSettings.address}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, address: e.target.value })
                      }
                      rows={2}
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {activeTab === 'hours' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Hours</h3>
              {Object.entries(businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-32">
                    <p className="text-sm font-medium text-slate-900 capitalize">{day}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="time"
                      value={hours.open}
                      disabled={hours.closed}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, open: e.target.value },
                        })
                      }
                      className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                    <span className="text-slate-500">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      disabled={hours.closed}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, close: e.target.value },
                        })
                      }
                      className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, closed: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700">Closed</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Facility Settings */}
          {activeTab === 'facility' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Facility Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={facilitySettings.maxCapacity}
                    onChange={(e) =>
                      setFacilitySettings({
                        ...facilitySettings,
                        maxCapacity: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Locker Count
                  </label>
                  <input
                    type="number"
                    value={facilitySettings.lockerCount}
                    onChange={(e) =>
                      setFacilitySettings({
                        ...facilitySettings,
                        lockerCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shower Count
                  </label>
                  <input
                    type="number"
                    value={facilitySettings.showerCount}
                    onChange={(e) =>
                      setFacilitySettings({
                        ...facilitySettings,
                        showerCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parking Spots
                  </label>
                  <input
                    type="number"
                    value={facilitySettings.parkingSpots}
                    onChange={(e) =>
                      setFacilitySettings({
                        ...facilitySettings,
                        parkingSpots: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 mt-6">Amenities</h4>
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={facilitySettings.wifiAvailable}
                    onChange={(e) =>
                      setFacilitySettings({ ...facilitySettings, wifiAvailable: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-900">WiFi Available</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={facilitySettings.towelService}
                    onChange={(e) =>
                      setFacilitySettings({ ...facilitySettings, towelService: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-900">Towel Service</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={facilitySettings.lockerRental}
                    onChange={(e) =>
                      setFacilitySettings({ ...facilitySettings, lockerRental: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-900">Locker Rental Available</span>
                </label>
              </div>
            </div>
          )}

          {/* Email Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Email Notifications</h3>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={emailSettings.sendWelcomeEmail}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, sendWelcomeEmail: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Welcome Email</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Send welcome email to new members
                    </p>
                  </div>
                </label>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={emailSettings.sendRenewalReminders}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendRenewalReminders: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500 mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Renewal Reminders</p>
                      <p className="text-xs text-slate-500 mt-1 mb-3">
                        Remind members before their membership expires
                      </p>
                      {emailSettings.sendRenewalReminders && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600">Send reminder</span>
                          <input
                            type="number"
                            value={emailSettings.reminderDaysBefore}
                            onChange={(e) =>
                              setEmailSettings({
                                ...emailSettings,
                                reminderDaysBefore: parseInt(e.target.value),
                              })
                            }
                            className="w-16 h-8 px-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min="1"
                          />
                          <span className="text-xs text-slate-600">days before expiry</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={emailSettings.sendClassReminders}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          sendClassReminders: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500 mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Class Reminders</p>
                      <p className="text-xs text-slate-500 mt-1 mb-3">
                        Send reminders for upcoming booked classes
                      </p>
                      {emailSettings.sendClassReminders && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600">Send reminder</span>
                          <input
                            type="number"
                            value={emailSettings.classReminderHours}
                            onChange={(e) =>
                              setEmailSettings({
                                ...emailSettings,
                                classReminderHours: parseInt(e.target.value),
                              })
                            }
                            className="w-16 h-8 px-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min="1"
                          />
                          <span className="text-xs text-slate-600">hours before class</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={emailSettings.sendMonthlyReports}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, sendMonthlyReports: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Monthly Reports</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Send monthly activity reports to members
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Social Media</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={socialMedia.instagram}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, instagram: e.target.value })
                      }
                      placeholder="@yourgym"
                      className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={socialMedia.facebook}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, facebook: e.target.value })
                      }
                      placeholder="YourGymPage"
                      className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Twitter</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={socialMedia.twitter}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, twitter: e.target.value })
                      }
                      placeholder="@yourgym"
                      className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 export default GymSettings;