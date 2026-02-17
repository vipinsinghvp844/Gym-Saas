import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const GymStaffCreate = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_title: "",
    shift: "full_day",
    salary: "",
    joining_date: "",
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
        salary: form.salary ? Number(form.salary) : null,
        joining_date: form.joining_date || null,
      };

      const res = await api.post("/gymadmin/staff/create.php", payload);

      if (res.data?.status) {
        alert("Staff added successfully");
        navigate("/gym/staff");
      } else {
        alert(res.data?.message || "Failed to create staff");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create staff");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-5">

        <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Add Staff</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage gym staff profile
          </p>
        </div>
       
      </div>
      {/* ================= BASIC INFO ================= */}
      <Card title="Basic Information">
        <Grid>
          <Input label="First Name *" value={form.first_name} onChange={(v) => update("first_name", v)} />
          <Input label="Last Name" value={form.last_name} onChange={(v) => update("last_name", v)} />
          <Input label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} />
        </Grid>
      </Card>

      {/* ================= PROFESSIONAL DETAILS ================= */}
      <Card title="Professional Details">
        <Grid>
          <Input
            label="Role Title"
            placeholder="Front Desk, Maintenance, Cleaning"
            value={form.role_title}
            onChange={(v) => update("role_title", v)}
          />

          <Select
            label="Shift"
            value={form.shift}
            onChange={(v) => update("shift", v)}
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Evening" },
              { value: "night", label: "Night" },
              { value: "full_day", label: "Full Day" },
            ]}
          />

          <Input
            label="Salary"
            type="number"
            placeholder="Monthly salary"
            value={form.salary}
            onChange={(v) => update("salary", v)}
          />

          <Input
            label="Joining Date"
            type="date"
            value={form.joining_date}
            onChange={(v) => update("joining_date", v)}
          />
        </Grid>
      </Card>

      {/* ================= STATUS ================= */}
      <Card title="Status">
        <Select
          label="Staff Status"
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
          {saving ? "Saving..." : "Add Staff"}
        </button>
      </div>

    </div>
  );
};

export default GymStaffCreate;

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
