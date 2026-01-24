import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Plus, Search, Eye, Trash2, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailTemplates = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  // filters
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  // preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTpl, setPreviewTpl] = useState(null);

  const loadStats = async () => {
    try {
      const res = await api.get("/email-templates/stats.php");
      setStats(res.data.data || null);
    } catch {
      setStats(null);
    }
  };

  const loadList = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/email-templates/list.php?status=${encodeURIComponent(
          status
        )}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      );

      const payload = res.data.data || {};
      setItems(payload.items || []);

      setPage(payload.pagination?.page || 1);
      setPages(payload.pagination?.pages || 1);
      setTotal(payload.pagination?.total || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      loadList();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [status, search, page]);

  const openPreview = async (id) => {
    try {
      setPreviewOpen(true);
      setPreviewTpl(null);
      const res = await api.get(`/email-templates/get.php?id=${id}`);
      setPreviewTpl(res.data.data || null);
    } catch (err) {
      console.error(err);
      alert("Failed to load preview");
      setPreviewOpen(false);
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewTpl(null);
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this email template?");
    if (!ok) return;

    try {
      await api.post("/email-templates/delete.php", { id });
      await loadList();
      await loadStats();
      alert("Deleted ✅");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const statusBadge = (s) => {
    const st = (s || "").toLowerCase();
    if (st === "active") return "bg-green-100 text-green-700";
    return "bg-slate-100 text-slate-700";
  };

  const showingText = useMemo(() => {
    return `${items.length} shown • Total ${total}`;
  }, [items, total]);

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Email Templates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage reusable email templates
          </p>
        </div>

        <button
          onClick={() => navigate("/superadmin/email-templates/create")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Total</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats?.total ?? "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats?.active ?? "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Inactive</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats?.inactive ?? "—"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search slug / name / subject..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">{showingText}</p>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 px-3 rounded-lg border border-slate-200 text-sm disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="h-9 px-3 rounded-lg border border-slate-200 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
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
                      <GymLoader label="Loading templates..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && items.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No templates found.
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">{t.subject}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-mono text-slate-700">
                        {t.slug}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPreview(t.id)}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/superadmin/email-templates/edit/${t.id}`)
                          }
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(t.id)}
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

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Email Preview
                </h3>
                <p className="text-sm text-slate-500">
                  {previewTpl?.name || "Loading..."}
                </p>
              </div>

              <button
                onClick={closePreview}
                className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>

            <div className="p-5 space-y-4">
              {!previewTpl ? (
                <div className="py-10 flex justify-center">
                  <GymLoader label="Loading preview..." />
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Subject</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {previewTpl.subject}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Variables:{" "}
                      {previewTpl.variables_json
                        ? previewTpl.variables_json
                        : "[]"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                      Body HTML Preview
                    </div>
                    <div
                      className="p-4"
                      dangerouslySetInnerHTML={{ __html: previewTpl.body_html }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
