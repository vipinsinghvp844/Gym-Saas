import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { Plus, Eye, Trash2, ExternalLink, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (dt) => {
  if (!dt) return "-";
  try {
    return new Date(dt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dt;
  }
};

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [siteType, setSiteType] = useState("all"); // all | platform | gym
  const [search, setSearch] = useState("");

  // pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // delete loading
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const loadPages = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params = { page, limit };
      if (siteType !== "all") params.site_type = siteType;
      if (search.trim() !== "") params.search = search.trim();

      const res = await api.get("/pages/list.php", { params });

      setPages(Array.isArray(res.data.data) ? res.data.data : []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      console.error("Failed to load pages", err);
      alert("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ debounce filters
  useEffect(() => {
    const t = setTimeout(() => {
      loadPages(1, pagination.limit);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteType, search]);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this page?");
    if (!ok) return;

    try {
      setDeletingId(id);

      await api.post("/pages/delete.php", { id });

      // if last item deleted -> go back one page safely
      const isLastItemOnPage = pages.length === 1 && pagination.page > 1;
      const nextPage = isLastItemOnPage ? pagination.page - 1 : pagination.page;

      await loadPages(nextPage, pagination.limit);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const emptyText = useMemo(() => {
    if (search.trim() || siteType !== "all") return "No pages match your filters.";
    return "No pages found.";
  }, [search, siteType]);

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
          onClick={() => navigate("/superadmin/pages/create")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Page
        </button>
      </div>

      {/* ✅ Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <select
              value={siteType}
              onChange={(e) => setSiteType(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="all">All Sites</option>
              <option value="platform">Platform</option>
              <option value="gym">Gym</option>
            </select>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search slug / template..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
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
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    {emptyText}
                  </td>
                </tr>
              )}

              {!loading &&
                pages.map((p) => {
                  const isDeleting = deletingId === p.id;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          /{p.slug}
                        </p>
                        <p className="text-xs text-slate-500">
                          Site: {p.site_type || "-"} • ID: {p.id}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900 font-medium">
                          {p.template_name || "-"}
                        </p>
                        <p className="text-xs text-slate-500">
                          Template ID: {p.template_id || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {formatDate(p.updated_at)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
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

                          <button
                            onClick={() =>
                              navigate(`/superadmin/pages/edit/${p.id}`)
                            }
                            className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={isDeleting}
                            className={`h-9 px-3 rounded-lg text-sm flex items-center gap-2 ${
                              isDeleting
                                ? "bg-red-200 text-red-700 cursor-not-allowed"
                                : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination Footer */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => loadPages(newPage, pagination.limit)}
          onLimitChange={(newLimit) => loadPages(1, newLimit)}
        />
      </div>
    </div>
  );
};

export default Pages;
