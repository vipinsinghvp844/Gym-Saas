import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/support/my-tickets.php");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            My Support Tickets
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Contact support for any issue
          </p>
        </div>

        <button
          onClick={() => navigate("/gym/support/create")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">Created</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan="5" className="py-10 text-center">
                  <GymLoader label="Loading tickets..." />
                </td>
              </tr>
            )}

            {!loading && tickets.length === 0 && (
              <tr>
                <td colSpan="5" className="py-10 text-center text-sm text-slate-500">
                  No tickets created yet
                </td>
              </tr>
            )}

            {!loading &&
              tickets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => navigate(`/gym/support/${t.id}`)}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {t.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {t.priority}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {t.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
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

export default MyTickets;
