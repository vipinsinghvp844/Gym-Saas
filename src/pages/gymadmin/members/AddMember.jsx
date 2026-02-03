import { useEffect, useState } from "react";
import GymLoader from "../../../components/ui/GymLoader";
import PageTitle from "../../../layouts/PageTitle";
import api from "../../../services/api";

const AddMember = () => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    plan_id: "",
    start_date: new Date().toISOString().slice(0, 10),
    payment_amount: "",
    payment_method: "cash",
  });

  /* =========================
     LOAD PLANS
  ========================= */
  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gymadmin/membership-plans/list.php");
      setPlans(res.data?.data || []);
    } catch {
      alert("Failed to load membership plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.first_name || !form.phone || !form.plan_id) {
      alert("First name, phone and plan are required");
      return;
    }

    const payload = {
      ...form,
      plan_id: Number(form.plan_id),
      payment_amount:
        form.payment_amount === "" ? null : Number(form.payment_amount),
    };

    try {
      setSaving(true);

      await api.post("/gymadmin/members/create.php", payload);

      alert("Member added successfully");
      window.location.href = "/gym/members";
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <GymLoader label="Loading form..." />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

      <PageTitle
        title="Add Member"
        subtitle="Register new gym member"
      />

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="First Name *"
            required
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
            onChange={(v) => update("email", v)}
          />

          <Input
            label="Phone *"
            required
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

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
        </Section>

        {/* MEMBERSHIP */}
        <Section title="Membership">
          <Select
            label="Membership Plan *"
            required
            value={form.plan_id}
            onChange={(v) => update("plan_id", v)}
            options={[
              { value: "", label: "Select plan" },
              ...plans.map((p) => ({
                value: p.id,
                label: `${p.name} (${p.duration_days} days)`,
              })),
            ]}
          />

          <Input
            label="Start Date"
            type="date"
            value={form.start_date}
            onChange={(v) => update("start_date", v)}
          />
        </Section>

        {/* PAYMENT */}
        <Section title="Payment (Optional)">
          <Input
            label="Amount"
            type="number"
            value={form.payment_amount}
            onChange={(v) => update("payment_amount", v)}
          />

          <Select
            label="Payment Method"
            value={form.payment_method}
            onChange={(v) => update("payment_method", v)}
            options={[
              { value: "cash", label: "Cash" },
              { value: "upi", label: "UPI" },
              { value: "card", label: "Card" },
              { value: "bank", label: "Bank Transfer" },
            ]}
          />
        </Section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => window.history.back()}
            disabled={saving}
            className="h-10 px-4 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={saving}
            className="h-10 px-6 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Add Member"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddMember;

/* =========================
   SMALL COMPONENTS
========================= */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-800">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, value, onChange, type = "text", required }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 border rounded-lg text-sm"
    />
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
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
