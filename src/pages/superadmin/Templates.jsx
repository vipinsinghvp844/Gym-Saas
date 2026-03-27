import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import {
  Plus,
  Search,
  LayoutTemplate,
  Pencil,
  Trash2,
  Eye,
  X,
  Wand2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TemplatePreviewRenderer from "../../website/TemplatePreviewRenderer";
import TablePagination from "../../components/ui/TablePagination";
import AssignTemplateModal from "../../components/ui/AssignTemplateModal";
import toast from "react-hot-toast";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ backend filters
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // ✅ preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // ✅ assign modal
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignTemplate, setAssignTemplate] = useState(null);

  const navigate = useNavigate();

  const loadTemplates = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        type,
        search: search.trim(),
      };

      const res = await api.get("/templates/list.php", { params });

      setTemplates(res.data.data || []);
      setPagination(
        res.data.pagination || { page, limit, total: 0, totalPages: 1 }
      );
    } catch (err) {
      console.error("Failed to load templates", err);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates(1, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ filter debounce
  useEffect(() => {
    const t = setTimeout(() => {
      loadTemplates(1, pagination.limit);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, search]);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this template?");
    if (!ok) return;

    try {
      await api.post("/templates/delete.php", { id });
      toast.success("Template deleted ✅");
      loadTemplates(pagination.page, pagination.limit);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const openPreview = async (templateRow) => {
    try {
      setPreviewOpen(true);
      setPreviewTemplate(null);

      const res = await api.get(`/templates/get.php?id=${templateRow.id}`);
      setPreviewTemplate(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load template preview");
      setPreviewOpen(false);
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const openAssign = (t) => {
    setAssignTemplate(t);
    setAssignOpen(true);
  };

  const closeAssign = () => {
    setAssignOpen(false);
    setAssignTemplate(null);
  };

  const getSectionsCount = (structure_json) => {
    try {
      const obj =
        typeof structure_json === "string"
          ? JSON.parse(structure_json || "{}")
          : structure_json || {};
      return Array.isArray(obj.sections) ? obj.sections.length : 0;
    } catch {
      return 0;
    }
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Templates</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform and gym website templates
          </p>
        </div>

        <button
          onClick={() => navigate("/superadmin/templates/create")}
          className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-slate-400" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Templates</option>
            <option value="platform">Platform Templates</option>
            <option value="gym">Gym Templates</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Sections
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
                    No templates found.
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
                      <p className="text-xs text-slate-500">ID: {t.id}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          t.type === "platform"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">
                        {getSectionsCount(t.structure_json)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {t.updated_at || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Preview */}
                        <button
                          onClick={() => openPreview(t)}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>

                        {/* Assign */}
                        <button
                          onClick={() => openAssign(t)}
                          className="h-9 px-3 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 flex items-center gap-2"
                        >
                          <Wand2 className="w-4 h-4" />
                          Assign
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/superadmin/templates/edit/${t.id}`)
                          }
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>

                        {/* Delete */}
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

        {/* ✅ Pagination */}
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => loadTemplates(newPage, pagination.limit)}
          onLimitChange={(newLimit) => loadTemplates(1, newLimit)}
        />
      </div>

      {/* ✅ Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between bg-white">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Template Preview
                </h2>
                <p className="text-sm text-slate-500">
                  {previewTemplate?.name || "-"} • {previewTemplate?.type || "-"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {previewTemplate?.id && (
                  <button
                    onClick={() => {
                      closePreview();
                      navigate(`/superadmin/templates/edit/${previewTemplate.id}`);
                    }}
                    className="h-9 px-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={closePreview}
                  className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50">
              {!previewTemplate ? (
                <div className="py-10 flex justify-center">
                  <GymLoader label="Loading preview..." />
                </div>
              ) : (
                <TemplatePreviewRenderer
                  structure_json={previewTemplate.structure_json}
                  page_data_json={previewTemplate.page_data_json}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Assign Modal */}
      <AssignTemplateModal
        isOpen={assignOpen}
        onClose={closeAssign}
        template={assignTemplate}
        onAssigned={() => loadTemplates(pagination.page, pagination.limit)}
      />
    </div>
  );
};

export default Templates;
