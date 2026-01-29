import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-slate-100 text-slate-700",
};

const statusColors = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-slate-200 text-slate-700",
};

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/support/list.php");
      setTickets(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Support Tickets
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          All support requests from gyms
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Gym
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <GymLoader label="Loading tickets..." />
                </td>
              </tr>
            )}

            {!loading && tickets.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No tickets found
                </td>
              </tr>
            )}

            {!loading &&
              tickets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() =>
                    navigate(`/superadmin/support/${t.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {t.subject}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {t.gym_name || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        priorityColors[t.priority]
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        statusColors[t.status]
                      }`}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(t.created_at).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <Eye className="w-4 h-4 text-slate-500" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportTickets;
