import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PageTitle from "../../../layouts/PageTitle";
import GymLoader from "../../../components/ui/GymLoader";

const GymTrainerCreate = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    specialty: "",
    experience_years: "",
    bio: "",
    allow_login: false,
    password: "",
    status: "active",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!form.first_name || !form.phone) {
      alert("First name & phone are required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        experience_years: form.experience_years
          ? Number(form.experience_years)
          : null,
      };

      const res = await api.post("/gymadmin/trainers/create.php", payload);

      if (res.data?.status) {
        alert("Trainer added successfully");
        navigate("/gym/trainers");
      } else {
        alert(res.data?.message || "Failed to create trainer");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create trainer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">

      <PageTitle
        title="Add Trainer"
        subtitle="Create and manage gym trainer profile"
      />

      {/* ================= BASIC INFO ================= */}
      <Card title="Basic Information">
        <Grid>
          <Input label="First Name *" value={form.first_name} onChange={(v) => update("first_name", v)} />
          <Input label="Last Name" value={form.last_name} onChange={(v) => update("last_name", v)} />
          <Input label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} />

          <Select
            label="Gender"
            value={form.gender}
            onChange={(v) => update("gender", v)}
            options={[
              { value: "", label: "Select" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          <Input
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={(v) => update("dob", v)}
          />
        </Grid>
      </Card>

      {/* ================= PROFESSIONAL ================= */}
      <Card title="Professional Details">
        <Grid>
          <Input
            label="Specialty"
            placeholder="Yoga, HIIT, Strength Training"
            value={form.specialty}
            onChange={(v) => update("specialty", v)}
          />

          <Input
            label="Experience (Years)"
            type="number"
            value={form.experience_years}
            onChange={(v) => update("experience_years", v)}
          />

          <Textarea
            label="Bio / About Trainer"
            value={form.bio}
            onChange={(v) => update("bio", v)}
          />
        </Grid>
      </Card>

      {/* ================= LOGIN ACCESS ================= */}
      <Card title="Login Access">
        <div className="space-y-4">

          <Toggle
            label="Allow Trainer Login"
            checked={form.allow_login}
            onChange={(v) => update("allow_login", v)}
          />

          {form.allow_login && (
            <Input
              label="Temporary Password"
              placeholder="Auto-generate or enter manually"
              value={form.password}
              onChange={(v) => update("password", v)}
            />
          )}

          <p className="text-xs text-slate-500">
            If enabled, trainer will get login access to the system.
          </p>
        </div>
      </Card>

      {/* ================= STATUS ================= */}
      <Card title="Status">
        <Select
          label="Trainer Status"
          value={form.status}
          onChange={(v) => update("status", v)}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "suspended", label: "Suspended" },
          ]}
        />
      </Card>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => navigate(-1)}
          disabled={saving}
          className="h-10 px-4 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          disabled={saving}
          className="h-10 px-6 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add Trainer"}
        </button>
      </div>

    </div>
  );
};

export default GymTrainerCreate;
const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm mt-1"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="sm:col-span-2">
    <label className="text-sm font-medium">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-24 px-3 border rounded-lg text-sm mt-1"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm mt-1"
    >
      {options.map((o, i) => (
        <option key={i} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition ${
        checked ? "bg-purple-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full transform transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);
