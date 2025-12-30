import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";

const Gyms = () => {
  const [gyms, setGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/gyms/list.php");
        setGyms(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGyms();
  }, []);


  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

      {/* HEADER */}
      <PageHeader
        title="All Gyms"
        subtitle="List of all registered gyms on the platform"
      />


      {/* CARD */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {isLoading && (
                <tr>
                  <td colSpan="4" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading gyms..." />
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && gyms.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No gyms found
                  </td>
                </tr>
              )}

              {!isLoading && gyms.map((g) => (
                <tr
                  key={g.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{g.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {g.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {g.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
            ${g.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {g.status}
                    </span>
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

export default Gyms;
