import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit, Trash2, Globe } from "lucide-react";
import api from "../../services/api";

const GymPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gym/pages/list.php");
      setPages(res?.data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  return (
    <div className="space-y-6 p-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Website Pages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage pages for your gym website
          </p>
        </div>

        <Link to="/gym/pages/create">
          <button className="h-10 px-4 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700">
            <Plus className="w-4 h-4" />
            Create Page
          </button>
        </Link>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!loading && pages.length === 0 && (
        <div className="bg-white border rounded-xl p-12 text-center text-slate-500">
          No pages created yet.
        </div>
      )}

      {/* ================= LOADER ================= */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          Loading pages...
        </div>
      )}

      {/* ================= PAGES GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pages.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
          >
            <div className="p-6 space-y-4">

              {/* Page Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.title || p.slug}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Globe className="w-3 h-3" />
                    /{p.slug}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {p.status || "draft"}
                </span>
              </div>

              {/* Template */}
              <div>
                <p className="text-xs text-slate-500">Template</p>
                <p className="text-sm font-medium text-slate-800">
                  {p.template_name || `Template #${p.template_id}`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-9 bg-purple-600 text-white rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-purple-700"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </a>

                <Link to={`/gym/pages/edit/${p.id}`}>
                  <button className="h-9 px-3 bg-slate-100 rounded-lg hover:bg-slate-200">
                    <Edit className="w-4 h-4" />
                  </button>
                </Link>

                <button className="h-9 px-3 bg-slate-100 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymPages;
