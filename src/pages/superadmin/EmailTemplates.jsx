import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import TablePagination from "../../components/ui/TablePagination";
import { Plus, Search, Eye, Trash2, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const badge = (st) => {
  const s = (st || "").toLowerCase();
  if (s === "active") return "bg-green-100 text-green-700";
  if (s === "inactive") return "bg-slate-100 text-slate-700";
  return "bg-slate-100 text-slate-700";
};

const EmailTemplates = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  // pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const loadTemplates = async (page = 1, limit = pagination.limit) => {
    try {
      setLoading(true);

      const params = { page, limit };
      if (status !== "all") params.status = status;
      if (search.trim() !== "") params.search = search.trim();

      const res = await api.get("/email-templates/list.php", { params });

      setTemplates(res.data.data || []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load email templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce filter changes
  useEffect(() => {
    const t = setTimeout(() => {
      loadTemplates(1, pagination.limit);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search]);

  const openPreview = async (row) => {
    try {
      setPreviewOpen(true);
      setPreview(null);

      const res = await api.get(`/email-templates/get.php?id=${row.id}`);
      setPreview(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load template preview");
      setPreviewOpen(false);
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreview(null);
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this email template?");
    if (!ok) return;

    try {
      await api.post("/email-templates/delete.php", { id });
      await loadTemplates(pagination.page, pagination.limit);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const summary = useMemo(() => {
    const total = pagination.total || templates.length;
    let active = 0;
    let inactive = 0;
    for (const t of templates) {
      const s = (t.status || "").toLowerCase();
      if (s === "active") active++;
      else inactive++;
    }
    return { total, active, inactive };
  }, [templates, pagination.total]);

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Email Templates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create & manage templates used in system emails
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
          <p className="text-2xl font-semibold text-slate-900">{summary.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Active</p>
          <p className="text-2xl font-semibold text-slate-900">{summary.active}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 mb-1">Inactive</p>
          <p className="text-2xl font-semibold text-slate-900">
            {summary.inactive}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / slug / subject..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
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
                  <td colSpan="5" className="py-10">
                    <div className="flex justify-center">
                      <GymLoader label="Loading templates..." />
                    </div>
                  </td>
                </tr>
              )}

              {!loading && templates.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No email templates found.
                  </td>
                </tr>
              )}

              {!loading &&
                templates.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">Slug: {t.slug}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{t.subject}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {t.updated_at || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPreview(t)}
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

        {/* Pagination Footer */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => loadTemplates(newPage, pagination.limit)}
          onLimitChange={(newLimit) => loadTemplates(1, newLimit)}
        />
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Template Preview
                </h3>
                <p className="text-sm text-slate-500">
                  {preview?.name || "Loading..."}
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

            <div className="p-5">
              {!preview ? (
                <div className="py-10 flex justify-center">
                  <GymLoader label="Loading preview..." />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Subject</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {preview.subject}
                    </p>

                    <p className="text-xs text-slate-500 mt-4">
                      Example variables you can use:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        "{{gym_name}}",
                        "{{owner_name}}",
                        "{{invoice_number}}",
                        "{{amount}}",
                        "{{due_date}}",
                        "{{login_url}}",
                      ].map((v) => (
                        <span
                          key={v}
                          className="px-2 py-0.5 text-xs rounded-full bg-white border border-slate-200 text-slate-700"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        HTML Preview
                      </p>
                    </div>

                    <div
                      className="p-4 max-h-[60vh] overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: preview.html_body }}
                    />
                  </div>
                </div>
              )}
            </div>

            {preview?.id && (
              <div className="px-5 py-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => {
                    closePreview();
                    navigate(`/superadmin/email-templates/edit/${preview.id}`);
                  }}
                  className="h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                >
                  Edit Template
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
