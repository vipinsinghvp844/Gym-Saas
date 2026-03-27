import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AddTrainerForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    status: "active",

    allowLogin: false,
    passwordType: "auto", // auto | manual
    password: "",
  });

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  return (
    <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">

      <h2 className="text-lg font-semibold text-slate-900">Add Trainer</h2>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Input
          label="Trainer Name *"
          value={form.name}
          onChange={(v) => update("name", v)}
        />

        <Input
          label="Phone *"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
        />

        <Input
          label="Specialty"
          placeholder="Strength, Yoga, Cardio..."
          value={form.specialty}
          onChange={(v) => update("specialty", v)}
        />

        <Select
          label="Status"
          value={form.status}
          onChange={(v) => update("status", v)}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </div>

      {/* LOGIN TOGGLE */}
      <div className="border-t pt-5 space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Allow Trainer Login
            </p>
            <p className="text-xs text-slate-500">
              Enable login access for this trainer
            </p>
          </div>

          <input
            type="checkbox"
            checked={form.allowLogin}
            onChange={(e) => update("allowLogin", e.target.checked)}
            className="h-5 w-5 accent-purple-600"
          />
        </div>

        {/* LOGIN SETTINGS */}
        {form.allowLogin && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">

            <p className="text-sm font-medium text-slate-800">
              Login Settings
            </p>

            <RadioGroup
              value={form.passwordType}
              onChange={(v) => update("passwordType", v)}
              options={[
                {
                  value: "auto",
                  label: "Auto-generate password (recommended)",
                },
                {
                  value: "manual",
                  label: "Set password manually",
                },
              ]}
            />

            {form.passwordType === "manual" && (
              <PasswordInput
                label="Password"
                value={form.password}
                onChange={(v) => update("password", v)}
              />
            )}

            {form.passwordType === "auto" && (
              <p className="text-xs text-slate-500">
                Password will be auto-generated and sent to trainer.
              </p>
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button className="h-10 px-4 border rounded-lg text-sm">
          Cancel
        </button>
        <button className="h-10 px-6 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
          Save Trainer
        </button>
      </div>
    </div>
  );
};

export default AddTrainerForm;
const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="text-xs font-medium text-slate-600">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs font-medium text-slate-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({ value, onChange, options }) => (
  <div className="space-y-2">
    {options.map((o) => (
      <label key={o.value} className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
        {o.label}
      </label>
    ))}
  </div>
);

const PasswordInput = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <div className="relative mt-1">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 px-3 pr-10 border border-slate-200 rounded-lg text-sm"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};
