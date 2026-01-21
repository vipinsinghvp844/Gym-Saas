import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Plus, Eye, Trash2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadPages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/pages/list.php");
      setPages(res.data.data || []);
    } catch (err) {
      console.error("Failed to load pages", err);
      alert("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this page?");
    if (!ok) return;

    try {
      await api.post("/pages/delete.php", { id });
      await loadPages();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pages</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform marketing pages (home, pricing, register)
          </p>
        </div>

        <button
          onClick={() => navigate("/superadmin/create-page")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Page
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="4" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading pages..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && pages.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-sm text-slate-500">
                    No pages found.
                  </td>
                </tr>
              )}

              {!loading &&
                pages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        /{p.slug}
                      </p>
                      <p className="text-xs text-slate-500">
                        Site: {p.site_type}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 font-medium">
                        {p.template_name || "-"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Template ID: {p.template_id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{p.updated_at || "-"}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Open public page */}
                        <a
                          href={`/p/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                          title="Open Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open
                        </a>

                        {/* Preview in admin (optional) */}
                        <button
                          onClick={() => window.open(`/p/${p.slug}`, "_blank")}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button
                          onClick={() => navigate(`/superadmin/pages/edit/${p.id}`)}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="h-9 px-3 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
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
};

export default Pages;
