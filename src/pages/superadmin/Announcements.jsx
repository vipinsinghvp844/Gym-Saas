import { useEffect, useMemo, useState } from "react";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import api from "../../services/api";
import AnnouncementModal from "../../layouts/AnnouncementModal";

const statusColors = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  archived: "bg-slate-200 text-slate-700",
};

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

const Announcements = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [status, setStatus] = useState("all"); // all | active | draft | archived
  const [search, setSearch] = useState("");

  // pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // delete loading
  const [deletingId, setDeletingId] = useState(null);

  const loadAnnouncements = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params = { page, limit };
      if (status !== "all") params.status = status;
      if (search.trim() !== "") params.search = search.trim();

      const res = await api.get("/announcements/list.php", { params });

      setRows(Array.isArray(res.data.data) ? res.data.data : []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      console.error("Failed to load announcements", err);
      alert("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ debounce filters (same as Pages.jsx)
  useEffect(() => {
    const t = setTimeout(() => {
      loadAnnouncements(1, pagination.limit);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search]);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this announcement?");
    if (!ok) return;

    try {
      setDeletingId(id);

      await api.post("/announcements/delete.php", { id });

      const isLastItemOnPage = rows.length === 1 && pagination.page > 1;
      const nextPage = isLastItemOnPage
        ? pagination.page - 1
        : pagination.page;

      await loadAnnouncements(nextPage, pagination.limit);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const emptyText = useMemo(() => {
    if (search.trim() || status !== "all")
      return "No announcements match your filters.";
    return "No announcements found.";
  }, [search, status]);

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Announcements
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform-wide announcements
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setOpenModal(true);
          }}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Announcement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title / message..."
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="4" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading announcements..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && rows.length === 0 && (
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
                rows.map((a) => {
                  const isDeleting = deletingId === a.id;

                  return (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {a.title}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {a.message}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            statusColors[a.status] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(a.updated_at)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditData(a);
                              setOpenModal(true);
                            }}
                            className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(a.id)}
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

        {/* Pagination */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) =>
            loadAnnouncements(newPage, pagination.limit)
          }
          onLimitChange={(newLimit) => loadAnnouncements(1, newLimit)}
        />
      </div>

      {/* Modal */}
      <AnnouncementModal
        open={openModal}
        editData={editData}
        onClose={() => setOpenModal(false)}
        reload={() => loadAnnouncements(pagination.page, pagination.limit)}
      />
    </div>
  );
};

export default Announcements;
