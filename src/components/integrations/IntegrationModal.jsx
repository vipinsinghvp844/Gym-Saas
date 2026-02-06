import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../ui/GymLoader";
import { INTEGRATION_SCHEMAS } from "./integrationSchemas";

const IntegrationModal = ({ open, integration, onClose, onSave }) => {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const schema = integration
    ? INTEGRATION_SCHEMAS[integration.slug]
    : null;

  useEffect(() => {
    if (integration?.config && typeof integration.config === "object") {
      setForm(integration.config);
    } else {
      setForm({});
    }
    setError("");
  }, [integration]);

  if (!open || !integration) return null;

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!schema) return true;

    for (const field of schema.fields) {
      if (field.required && !form[field.key]) {
        setError(`${field.label} is required`);
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      setError("");

      await api.post("/superadmin/integrations/save.php", {
        slug: integration.slug,
        config: form,
      });

      onSave(); // refresh parent
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to save integration"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {schema?.title || `Configure ${integration.name}`}
        </h3>

        {/* FORM */}
        <div className="space-y-4">
          {!schema && (
            <div className="text-sm text-slate-500">
              No configuration required for this integration.
            </div>
          )}

          {schema?.fields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              type={field.type || "text"}
              value={form[field.key] || ""}
              onChange={(v) => update(field.key, v)}
            />
          ))}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="h-10 px-4 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="h-10 px-5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {saving && (
          <div className="mt-4">
            <GymLoader label="Saving configuration..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationModal;

/* ---------- reusable input ---------- */

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);
