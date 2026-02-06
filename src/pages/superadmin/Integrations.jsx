import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import {
  Plug,
  CreditCard,
  FileText,
  Megaphone,
} from "lucide-react";
import IntegrationModal from "../../components/integrations/IntegrationModal";

const ICONS = {
  stripe: CreditCard,
  sendgrid: FileText,
  smtp: FileText,
  slack: Megaphone,
  zapier: Plug,
  webhooks: Plug,
};

const STATUS_BADGE = {
  connected: "bg-green-100 text-green-700",
  disconnected: "bg-slate-100 text-slate-700",
  error: "bg-red-100 text-red-700",
  disabled: "bg-slate-200 text-slate-600",
};

const Integrations = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [testingId, setTestingId] = useState(null);

  const loadIntegrations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superadmin/integrations/list.php");
      setIntegrations(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      alert("Failed to load integrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  /* TOGGLE */
  const toggleIntegration = async (integration) => {
    try {
      setTogglingId(integration.id);

      await api.post("/superadmin/integrations/toggle.php", {
        slug: integration.slug,
        is_enabled: integration.is_enabled ? 0 : 1,
      });

      await loadIntegrations();
    } catch (err) {
      alert(err?.response?.data?.message || "Toggle failed");
    } finally {
      setTogglingId(null);
    }
  };

  /* CAN TEST */
  const canTest = (i) => {
    if (!i.is_enabled) return false;
    if (!i.config || Object.keys(i.config).length === 0) return false;
    return true;
  };

  /* TEST */
  const testIntegration = async (integration) => {
    try {
      setTestingId(integration.id);

      const res = await api.post(
        "/superadmin/integrations/test.php",
        { slug: integration.slug }
      );

      alert(res.data.message || "Integration test successful");
      await loadIntegrations();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Integration test failed"
      );
      await loadIntegrations();
    } finally {
      setTestingId(null);
    }
  };

  /* UI HELPERS */
  const getDisplayStatus = (i) => {
    if (!i.is_enabled) return "disabled";
    return i.status;
  };

  const getButtonText = (i) => {
    if (!i.is_enabled) return "Disabled";
    if (i.status === "connected") return "Configure";
    if (i.status === "error") return "Fix";
    return "Connect";
  };

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Integrations
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Connect and manage third-party services
        </p>
      </div>

      {loading ? (
        <div className="py-10">
          <GymLoader label="Loading integrations..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((i) => {
            const Icon = ICONS[i.slug] || Plug;
            const displayStatus = getDisplayStatus(i);

            return (
              <div
                key={i.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        STATUS_BADGE[displayStatus]
                      }`}
                    >
                      {displayStatus}
                    </span>

                    <button
                      disabled={togglingId === i.id}
                      onClick={() => toggleIntegration(i)}
                      className={`w-11 h-6 rounded-full relative transition ${
                        i.is_enabled ? "bg-green-600" : "bg-slate-300"
                      } ${togglingId === i.id ? "opacity-60" : ""}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                          i.is_enabled ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {i.name}
                </h3>

                <p className="text-sm text-slate-600 mb-4 capitalize">
                  Category: {i.category}
                </p>

                <button
                  disabled={!i.is_enabled}
                  onClick={() => {
                    setSelected(i);
                    setOpenModal(true);
                  }}
                  className={`w-full h-10 rounded-lg text-sm font-medium ${
                    !i.is_enabled
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : i.status === "connected"
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {getButtonText(i)}
                </button>

                <button
                  disabled={!canTest(i) || testingId === i.id}
                  onClick={() => testIntegration(i)}
                  className={`mt-2 w-full h-9 rounded-lg text-sm font-medium border ${
                    !canTest(i)
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {testingId === i.id ? "Testing..." : "Test Connection"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <IntegrationModal
        open={openModal}
        integration={selected}
        onClose={() => setOpenModal(false)}
        onSave={() => {
          setOpenModal(false);
          loadIntegrations();
        }}
      />
    </div>
  );
};

export default Integrations;
