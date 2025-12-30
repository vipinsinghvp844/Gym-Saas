import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gyms/requests.php");
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Failed to load requests", err);
      alert("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    let payload = { request_id: id, action };

    if (action === "rejected") {
      const reason = prompt("Enter rejection reason:");
      if (!reason) return;
      payload.reason = reason;
    }

    await api.post("/gyms/approve-request.php", payload);
    loadRequests();
  };

  return (
      <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

        {/* HEADER */}
        <PageHeader
          title="Gym Requests"
          subtitle="Approve or reject gym registration requests"
        />

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Gym Name</th>
                  <th className="px-4 py-3 text-left font-medium">Owner</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Plan</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">

                {/* LOADER */}
                {loading && (
                  <tr>
                    <td colSpan="7" className="py-10">
                      <div className="flex justify-center">
                        <GymLoader label="Loading requests..." />
                      </div>
                    </td>
                  </tr>
                )}

                {/* EMPTY */}
                {!loading && requests.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No requests found
                    </td>
                  </tr>
                )}

                {/* DATA */}
                {!loading && requests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {r.gym_name}
                    </td>
                    <td className="px-4 py-3">{r.owner_name}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {r.owner_email}
                    </td>
                    <td className="px-4 py-3">{r.plan}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            r.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : r.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(r.id, "approved")}
                            className="px-3 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(r.id, "rejected")}
                            className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
      </div>
  );
};

export default Requests;
