import { useEffect, useState } from "react";
import api from "../../services/api"; // 🔐 PRIVATE API
import SuperAdminLayout from "../../layouts/SuperAdminLayout";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await api.get("/gyms/requests.php"); // ✅ CORRECT
      setRequests(res.data.data);
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
    <>
      <h2>Gym Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Gym Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.gym_name}</td>
                <td>{r.owner_name}</td>
                <td>{r.owner_email}</td>
                <td>{r.plan}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(r.id, "approved")}
                      >
                        Approve
                      </button>
                      &nbsp;
                      <button
                        onClick={() => handleAction(r.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Requests;
