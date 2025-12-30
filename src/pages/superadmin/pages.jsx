import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        const res = await api.get("/pages/list.php");
        setPages(res.data.data || []);
      } catch (err) {
        console.error("Failed to load pages", err);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

      {/* HEADER */}
      <PageHeader
        title="Pages"
        subtitle="Manage website pages and their assigned templates"
      />

      {/* CARD */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Template</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {/* LOADER */}
              {loading && (
                <tr>
                  <td colSpan="5" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading pages..." />
                    </div>
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && pages.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No pages found
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading && pages.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    /{p.slug}
                  </td>
                  <td className="px-4 py-3">{p.template}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          p.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/superadmin/pages/edit/${p.id}`}
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      Edit
                    </Link>
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

export default Pages;
