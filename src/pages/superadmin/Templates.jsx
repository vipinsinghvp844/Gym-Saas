import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const res = await api.get("/templatess/list.php");
        setTemplates(res.data.data || []);
      } catch (err) {
        console.error("Failed to load templates", err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

      {/* HEADER */}
      <PageHeader
        title="Templates"
        subtitle="Manage available website templates for gyms"
      />

      {/* CARD */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {/* LOADER */}
              {loading && (
                <tr>
                  <td colSpan="3" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading templates..." />
                    </div>
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && templates.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No templates found
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading && templates.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {t.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          t.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {t.status}
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

export default Templates;
