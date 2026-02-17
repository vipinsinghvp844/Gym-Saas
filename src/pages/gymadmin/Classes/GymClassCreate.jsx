import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const GymClassCreate = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [trainers, setTrainers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    trainer_id: "",
    schedule_text: "",
    duration_minutes: 60,
    capacity: 10,
    status: "active",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const fetchTrainers = async () => {
    try {
      const res = await api.get("/gymadmin/trainers/list.php");
      if (res.data?.status) {
        setTrainers(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const submit = async () => {
    if (!form.name) {
      alert("Class name is required");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: form.name,
        trainer_id: form.trainer_id || null,
        schedule_text: form.schedule_text || null,
        duration_minutes: Number(form.duration_minutes) || 60,
        capacity: Number(form.capacity) || 10,
        status: form.status,
      };

      const res = await api.post("/gymadmin/classes/create.php", payload);

      if (res.data?.status) {
        alert("Class created successfully");
        navigate("/gym/classes");
      } else {
        alert(res.data?.message || "Failed to create class");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create class");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create Class</h1>
          <p className="text-sm text-slate-500 mt-1">Add a new class to your gym</p>
        </div>
      </div>

      <Card title="Basic Information">
        <Grid>
          <Input label="Class Name *" value={form.name} onChange={(v) => update("name", v)} />
          <Select
            label="Trainer"
            value={form.trainer_id}
            onChange={(v) => update("trainer_id", v)}
            options={[{ value: "", label: "Select" }, ...trainers.map(t => ({ value: t.id, label: `${t.first_name} ${t.last_name}` }))]}
          />
          <Input label="Schedule (text)" value={form.schedule_text} onChange={(v) => update("schedule_text", v)} placeholder="Mon, Wed - 6:00 AM" />
          <Input label="Duration (minutes)" type="number" value={form.duration_minutes} onChange={(v) => update("duration_minutes", v)} />
          <Input label="Capacity" type="number" value={form.capacity} onChange={(v) => update("capacity", v)} />
        </Grid>
      </Card>

      <Card title="Status">
        <Select
          label="Status"
          value={form.status}
          onChange={(v) => update("status", v)}
          options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
        />
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={() => navigate(-1)} disabled={saving} className="h-10 px-4 border rounded-lg text-sm">Cancel</button>
        <button onClick={submit} disabled={saving} className="h-10 px-6 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-60">{saving ? "Saving..." : "Create Class"}</button>
      </div>
    </div>
  );
};

export default GymClassCreate;

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
    <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full h-10 px-3 border rounded-lg text-sm mt-1" />
  </div>
);

const Select = ({ label, value, onChange, options = [] }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 px-3 border rounded-lg text-sm mt-1">
      {options.map((o, i) => (
        <option key={i} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);
