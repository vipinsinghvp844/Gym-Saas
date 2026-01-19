import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { Plus, Search, LayoutTemplate, Pencil, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TemplatePreviewRenderer from "../../website/TemplatePreviewRenderer";


const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("all"); // all | platform | gym
  const [search, setSearch] = useState("");

  // ✅ preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const res = await api.get("/templatess/list.php");
      setTemplates(res.data.data || []);
    } catch (err) {
      console.error("Failed to load templates", err);
      alert("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesType = type === "all" ? true : t.type === type;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === ""
          ? true
          : (t.name || "").toLowerCase().includes(q) ||
          (t.type || "").toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [templates, type, search]);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this template?");
    if (!ok) return;

    try {
      await api.post("/templatess/delete.php", { id });
      await loadTemplates();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const getSectionsCount = (structure_json) => {
    try {
      const obj = JSON.parse(structure_json || "{}");
      return (obj.sections || []).length;
    } catch {
      return 0;
    }
  };

  const openPreview = async (templateRow) => {
    try {
      // ✅ load full template (structure_json + page_data_json)
      const res = await api.get(`/templatess/get.php?id=${templateRow.id}`);
      setPreviewTemplate(res.data.data);
      setPreviewOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load template preview");
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const parseJSON = (str) => {
    try {
      return JSON.parse(str || "{}");
    } catch {
      return {};
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

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-sm text-slate-500">
                    No templates found.
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">ID: {t.id}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${t.type === "platform"
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
                      <div className="flex items-center gap-2">
                        {/* ✅ View */}
                        <button
                          onClick={() => openPreview(t)}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>

                        {/* ✅ Edit */}
                        <button
                          onClick={() => navigate(`/superadmin/templates/edit/${t.id}`)}
                          className="h-9 px-3 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>

                        {/* ✅ Delete */}
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

      {/* ✅ Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Template Preview
                </h2>
                <p className="text-sm text-slate-500">
                  {previewTemplate?.name || "-"} • {previewTemplate?.type || "-"}
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
              {!previewTemplate ? (
                <div className="py-10 flex justify-center">
                  <GymLoader label="Loading preview..." />
                </div>
              ) : (
                (() => {
                  const structure = parseJSON(previewTemplate.structure_json);
                  const pageData = parseJSON(previewTemplate.page_data_json);

                  const sections = structure.sections || [];

                  return (
                    <div className="space-y-4">
                      {sections.length === 0 ? (
                        <div className="text-center text-sm text-slate-500 py-10">
                          No sections found in this template.
                        </div>
                      ) : (
                        sections.map((sec, idx) => {
                          const sid = sec.id || sec.type;
                          const data = pageData[sid] || pageData[sec.type] || {};

                          return (
                            <div
                              key={sid + idx}
                              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900 capitalize">
                                  {idx + 1}. {sec.type}
                                </p>

                                <span className="text-xs text-slate-500">
                                  Section ID: {sid}
                                </span>
                              </div>

                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.keys(data).length === 0 ? (
                                  <p className="text-xs text-slate-500">
                                    No content fields
                                  </p>
                                ) : (
                                  Object.keys(data).map((k) => (
                                    <div
                                      key={k}
                                      className="bg-white rounded-xl border border-slate-200 p-3"
                                    >
                                      <p className="text-xs text-slate-500">
                                        {k.replaceAll("_", " ")}
                                      </p>
                                      <p className="text-sm font-medium text-slate-900 mt-1 break-words">
                                        {String(data[k] || "-")}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })()
              )}
            </div>

            {previewOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
      
      {/* Header */}
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

      {/* Preview Body */}
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


          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
