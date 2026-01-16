import { X, Search, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const AssignAdminModal = ({ isOpen, onClose, onAssign, gymName }) => {
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const availableAdmins = [
    { id: "1", name: "Sarah Johnson", email: "sarah@email.com", status: "Available" },
    { id: "2", name: "Mike Davis", email: "mike@email.com", status: "Available" },
    { id: "3", name: "Emma Wilson", email: "emma@email.com", status: "Available" },
  ];

  // ✅ Escape to close (NO return null here)
  useEffect(() => {
    if (!isOpen) return; // ✅ only return nothing

    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // ✅ Filter list by search
  const filteredAdmins = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    if (!s) return availableAdmins;
    return availableAdmins.filter(
      (a) => a.name.toLowerCase().includes(s) || a.email.toLowerCase().includes(s)
    );
  }, [searchTerm]);

  // ✅ if modal closed, don't render
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Assign Gym Admin</h2>
            <p className="text-sm text-slate-500 mt-1">{gymName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {filteredAdmins.map((admin) => (
              <button
                key={admin.id}
                type="button"
                onClick={() => setSelectedAdmin(admin.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedAdmin === admin.id
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                      {admin.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{admin.name}</p>
                      <p className="text-xs text-slate-500">{admin.email}</p>
                    </div>
                  </div>

                  {selectedAdmin === admin.id && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}

            {filteredAdmins.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No admins found</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (!selectedAdmin) return;
              onAssign(selectedAdmin);
              onClose();
            }}
            disabled={!selectedAdmin}
            className="flex-1 h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAdminModal;
