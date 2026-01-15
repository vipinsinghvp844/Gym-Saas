import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";

// const Requests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const loadRequests = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/gyms/requests.php");
//       setRequests(res.data.data || []);
//     } catch (err) {
//       console.error("Failed to load requests", err);
//       alert("Unauthorized or server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     let payload = { request_id: id, action };

//     if (action === "rejected") {
//       const reason = prompt("Enter rejection reason:");
//       if (!reason) return;
//       payload.reason = reason;
//     }

//     await api.post("/gyms/approve-request.php", payload);
//     loadRequests();
//   };

//   return (
//       <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

//         {/* HEADER */}
//         <PageHeader
//           title="Gym Requests"
//           subtitle="Approve or reject gym registration requests"
//         />

//         {/* CARD */}
//         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-gray-700">
//               <thead className="bg-gray-50 text-gray-600">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-medium">ID</th>
//                   <th className="px-4 py-3 text-left font-medium">Gym Name</th>
//                   <th className="px-4 py-3 text-left font-medium">Owner</th>
//                   <th className="px-4 py-3 text-left font-medium">Email</th>
//                   <th className="px-4 py-3 text-left font-medium">Plan</th>
//                   <th className="px-4 py-3 text-left font-medium">Status</th>
//                   <th className="px-4 py-3 text-left font-medium">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">

//                 {/* LOADER */}
//                 {loading && (
//                   <tr>
//                     <td colSpan="7" className="py-10">
//                       <div className="flex justify-center">
//                         <GymLoader label="Loading requests..." />
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* EMPTY */}
//                 {!loading && requests.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-4 py-6 text-center text-gray-500"
//                     >
//                       No requests found
//                     </td>
//                   </tr>
//                 )}

//                 {/* DATA */}
//                 {!loading && requests.map((r) => (
//                   <tr key={r.id} className="hover:bg-gray-50 transition">
//                     <td className="px-4 py-3">{r.id}</td>
//                     <td className="px-4 py-3 font-medium text-gray-900">
//                       {r.gym_name}
//                     </td>
//                     <td className="px-4 py-3">{r.owner_name}</td>
//                     <td className="px-4 py-3 text-gray-500">
//                       {r.owner_email}
//                     </td>
//                     <td className="px-4 py-3">{r.plan}</td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium
//                           ${
//                             r.status === "approved"
//                               ? "bg-green-100 text-green-700"
//                               : r.status === "rejected"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                       >
//                         {r.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       {r.status === "pending" && (
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleAction(r.id, "approved")}
//                             className="px-3 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700 transition"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleAction(r.id, "rejected")}
//                             className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}

//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//   );
// };

// export default Requests;

import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

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
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Gym Requests</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and approve new gym applications
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Pending Requests</p>
          <p className="text-2xl font-semibold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Approved Today</p>
          <p className="text-2xl font-semibold text-slate-900">5</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Rejected Today</p>
          <p className="text-2xl font-semibold text-slate-900">2</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Requested Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading && (
                  <tr>
                    <td colSpan="7" className="py-10">
                      <div className="flex justify-center">
                        <GymLoader label="Loading requests..." />
                      </div>
                    </td>
                  </tr>
                )}
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{request.gym_name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{request.ownerName}</p>
                    <p className="text-xs text-slate-500">{request.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      {request.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{request.requestDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      <Clock className="w-3 h-3" />
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="h-8 px-3 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button className="h-8 px-3 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Requests

