import { useEffect, useState } from "react";
import GymLoader from "../../components/ui/GymLoader";
import api from "../../services/api";

const TABS = [
  { key: "general", label: "General" },
  { key: "email", label: "Email" },
  { key: "payment", label: "Payment" },
  { key: "security", label: "Security" },
  { key: "integrations", label: "Integrations" },
  { key: "advanced", label: "Advanced" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superadmin/settings/get.php");
      setSettings(res.data.data || {});
    } catch (err) {
      console.error(err);
      alert("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentTab = async () => {
    try {
      setSaving(true);
      await api.post("/superadmin/settings/save.php", {
        [activeTab]: settings[activeTab],
      });
      alert("Settings saved");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const update = (group, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="p-10">
        <GymLoader label="Loading settings..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure platform settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl border p-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium ${
                activeTab === t.key
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl border p-6 space-y-5">

          {/* GENERAL */}
          {activeTab === "general" && (
            <>
              <Input label="Platform Name"
                value={settings.general?.platform_name || ""}
                onChange={(v) => update("general", "platform_name", v)}
              />
              <Input label="Support Email"
                value={settings.general?.support_email || ""}
                onChange={(v) => update("general", "support_email", v)}
              />
              <Input label="Timezone"
                value={settings.general?.timezone || ""}
                onChange={(v) => update("general", "timezone", v)}
              />
              <ToggleSwitch
                label="Maintenance Mode"
                desc="Temporarily disable platform access"
                checked={!!settings.general?.maintenance_mode}
                onChange={(v) => update("general", "maintenance_mode", v)}
              />
            </>
          )}

          {/* EMAIL */}
          {activeTab === "email" && (
            <>
              <Input label="SMTP Host" value={settings.email?.smtp_host || ""} onChange={(v)=>update("email","smtp_host",v)} />
              <Input label="SMTP Port" value={settings.email?.smtp_port || ""} onChange={(v)=>update("email","smtp_port",v)} />
              <Input label="SMTP Username" value={settings.email?.smtp_username || ""} onChange={(v)=>update("email","smtp_username",v)} />
              <Input type="password" label="SMTP Password" value={settings.email?.smtp_password || ""} onChange={(v)=>update("email","smtp_password",v)} />
            </>
          )}

          {/* PAYMENT */}
          {activeTab === "payment" && (
            <>
              <Input label="Currency" value={settings.payment?.currency || ""} onChange={(v)=>update("payment","currency",v)} />
              <Input label="Stripe Public Key" value={settings.payment?.stripe_public_key || ""} onChange={(v)=>update("payment","stripe_public_key",v)} />
              <Input type="password" label="Stripe Secret Key" value={settings.payment?.stripe_secret_key || ""} onChange={(v)=>update("payment","stripe_secret_key",v)} />
            </>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <>
              <Input label="JWT Expiry (minutes)" value={settings.security?.jwt_expiry_minutes || ""} onChange={(v)=>update("security","jwt_expiry_minutes",v)} />
              <Input label="Session Timeout (minutes)" value={settings.security?.session_timeout_minutes || ""} onChange={(v)=>update("security","session_timeout_minutes",v)} />
              <ToggleSwitch label="Enable 2FA" checked={!!settings.security?.enable_2fa} onChange={(v)=>update("security","enable_2fa",v)} />
              <ToggleSwitch label="Force HTTPS" checked={!!settings.security?.force_https} onChange={(v)=>update("security","force_https",v)} />
            </>
          )}

          {/* INTEGRATIONS */}
          {activeTab === "integrations" && (
            <>
              <ToggleSwitch label="Enable Webhooks" checked={!!settings.integrations?.webhook_enabled} onChange={(v)=>update("integrations","webhook_enabled",v)} />
              <Input label="Webhook URL" value={settings.integrations?.webhook_url || ""} onChange={(v)=>update("integrations","webhook_url",v)} />
              <Input label="API Rate Limit" value={settings.integrations?.api_rate_limit || ""} onChange={(v)=>update("integrations","api_rate_limit",v)} />
            </>
          )}

          {/* ADVANCED */}
          {activeTab === "advanced" && (
            <>
              <ToggleSwitch danger label="Allow New Gym Registration" checked={!!settings.advanced?.allow_gym_registration} onChange={(v)=>update("advanced","allow_gym_registration",v)} />
              <ToggleSwitch danger label="Debug Mode" checked={!!settings.advanced?.debug_mode} onChange={(v)=>update("advanced","debug_mode",v)} />
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                ⚠️ These settings affect the entire platform.
              </div>
            </>
          )}

          {/* Save */}
          <div className="pt-4">
            <button
              disabled={saving}
              onClick={saveCurrentTab}
              className="h-10 px-6 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              {saving ? "Saving..." : `Save ${activeTab} Settings`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;

/* Reusable components */
const Input = ({ label, value, onChange, type="text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm"
    />
  </div>
);

const ToggleSwitch = ({ label, desc, checked, onChange, danger }) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className={`text-sm font-medium ${danger ? "text-red-700" : ""}`}>
        {label}
      </p>
      {desc && <p className="text-xs text-slate-500">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative ${
        checked ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${checked ? "right-0.5" : "left-0.5"}`} />
    </button>
  </div>
);
