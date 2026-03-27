import { useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const [form, setForm] = useState({
    subject: "",
    priority: "medium",
    message: "",
  });

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      alert("Subject and message required");
      return;
    }

    try {
      setSaving(true);
      await api.post("/support/create.php", form);
      alert("Ticket created ✅");
      navigate("/gym/support");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5 space-y-6 max-w-3xl">
      <PageHeader
        title="Create Support Ticket"
        subtitle="Describe your issue clearly"
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">Subject</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Message</label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={submit}
            disabled={saving}
            className="h-11 px-5 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
