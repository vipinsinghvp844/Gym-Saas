import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import PageTitle from "../../../layouts/PageTitle";
import GymLoader from "../../../components/ui/GymLoader";

const GymMemberEditDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    status: "active",
  });

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* =========================
     LOAD MEMBER
  ========================= */
  const loadMember = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gymadmin/members/edit.php", {
        params: { id },
      });

      if (res.data?.status) {
        setForm(res.data.data.member);
      } else {
        alert(res.data?.message || "Member not found");
      }
    } catch {
      alert("Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, [id]);

  /* =========================
     SAVE
  ========================= */
  const save = async () => {
    if (!form.first_name || !form.phone) {
      alert("First name & phone are required");
      return;
    }

    try {
      setSaving(true);

      const res = await api.post("/gymadmin/members/update.php", form);

      if (res.data?.status) {
        alert("Member updated successfully");
      } else {
        alert(res.data?.message || "Update failed");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <GymLoader label="Loading member details..." />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

      <PageTitle
        title="Edit Member"
        subtitle={`Member ID #${form.id}`}
      />

      {/* PROFILE */}
      <Card title="Profile Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input
            label="First Name *"
            value={form.first_name}
            onChange={(v) => update("first_name", v)}
          />

          <Input
            label="Last Name"
            value={form.last_name}
            onChange={(v) => update("last_name", v)}
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            disabled
          />

          <Input
            label="Phone *"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

          <Select
            label="Gender"
            value={form.gender || ""}
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
            value={form.dob || ""}
            onChange={(v) => update("dob", v)}
          />

          <Select
            label="Status"
            value={form.status}
            onChange={(v) => update("status", v)}
            options={[
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspended" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

        </div>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => window.history.back()}
          disabled={saving}
          className="h-10 px-4 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={save}
          disabled={saving}
          className="h-10 px-6 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
};

export default GymMemberEditDetail;
const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text", disabled }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm disabled:bg-gray-100"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm"
    >
      {options.map((o, i) => (
        <option key={i} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
