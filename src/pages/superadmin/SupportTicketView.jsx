import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { ArrowLeft, Send } from "lucide-react";

const SupportTicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const loadTicket = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/support/get.php?id=${id}`);
      setTicket(res.data.data.ticket);
      setReplies(res.data.data.replies || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  const sendReply = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);
      await api.post("/support/reply.php", {
        ticket_id: Number(id),
        message,
      });
      setMessage("");
      loadTicket();
    } catch (err) {
      console.error(err);
      alert("Reply failed");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <GymLoader label="Loading ticket..." />
      </div>
    );
  }

  if (!ticket) {
    return <p className="p-6 text-sm text-slate-500">Ticket not found</p>;
  }

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {ticket.subject}
          </h1>
          <p className="text-sm text-slate-500">
            Gym: {ticket.gym_name || "—"}
          </p>
        </div>

        <button
          onClick={() => navigate("/superadmin/support")}
          className="h-9 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Original Message */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <p className="text-sm text-slate-700 whitespace-pre-line">
          {ticket.message}
        </p>
      </div>

      {/* Replies */}
      <div className="space-y-3">
        {replies.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-xl ${
              r.sender === "super_admin"
                ? "bg-indigo-50 border border-indigo-200"
                : "bg-slate-50 border"
            }`}
          >
            <p className="text-xs text-slate-500 mb-1">
              {r.sender} •{" "}
              {new Date(r.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-slate-800 whitespace-pre-line">
              {r.message}
            </p>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Write reply..."
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={sendReply}
            disabled={sending}
            className="h-9 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketView;
