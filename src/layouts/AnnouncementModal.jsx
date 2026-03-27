import { X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";

const AnnouncementModal = ({ open, onClose, editData, reload }) => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({ title: "", message: "", status: "draft" });
    }
  }, [editData]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!form.title || !form.message) {
      alert("Title & message required");
      return;
    }

    try {
      setLoading(true);
      if (editData) {
        await api.post("/announcements/update.php", form);
      } else {
        await api.post("/announcements/create.php", form);
      }
      reload();
      onClose();
    } catch (err) {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {editData ? "Edit Announcement" : "New Announcement"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <input
            className="w-full h-10 border rounded-lg px-3 text-sm"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows="4"
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <select
            className="w-full h-10 border rounded-lg px-3 text-sm"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 h-10 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 h-10 bg-indigo-600 text-white rounded-lg text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
