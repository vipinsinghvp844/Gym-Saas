import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";

const normalizeValue = (value, field) => {
  if (field === "items") {
    if (Array.isArray(value)) return value;
    if (typeof value === "string")
      return value.split(",").map((v) => v.trim());
    return [];
  }
  return value || "";
};

const EditPage = () => {
  const { id } = useParams();
  const [structure, setStructure] = useState(null);
  const [pageData, setPageData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const res = await api.get(`/pages/get.php?id=${id}`);
    const page = res.data.data;

    const struct = JSON.parse(page.structure_json);
    const data = JSON.parse(page.page_data_json || "{}");

    const normalized = {};

    struct.sections.forEach((sec) => {
      normalized[sec.type] = {};

      Object.keys(sec.data).forEach((field) => {
        normalized[sec.type][field] = normalizeValue(
          data?.[sec.type]?.[field],
          field
        );
      });
    });

    setStructure(struct);
    setPageData(normalized);
  };

  const updateField = (section, field, value) => {
    setPageData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const save = async () => {
    try {
      setSaving(true);
      await api.post("/pages/update-content.php", {
        page_id: id,
        page_data: pageData,
      });
      alert("Page updated successfully");
    } finally {
      setSaving(false);
    }
  };

  if (!structure) {
    return (
      <div className="p-6 text-gray-500">Loading page editor…</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6 bg-white">

      <PageHeader
        title="Edit Page Content"
        subtitle="Update sections and content for this page"
      />

      {/* SECTIONS */}
      <div className="space-y-6">
        {structure.sections.map((sec, index) => (
          <div
            key={sec.type}
            className="border border-gray-200 rounded-xl bg-gray-50 p-5"
          >
            {/* SECTION HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase">
                {index + 1}. {sec.type}
              </h3>
            </div>

            {/* SECTION FIELDS */}
            <div className="space-y-4">
              {Object.keys(sec.data).map((field) => {
                // LIST FIELD
                if (field === "items") {
                  return (
                    <div key={field}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field}
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="One item per line"
                        value={(pageData[sec.type]?.items || []).join("\n")}
                        onChange={(e) =>
                          updateField(
                            sec.type,
                            "items",
                            e.target.value
                              .split("\n")
                              .map((v) => v.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Enter one item per line
                      </p>
                    </div>
                  );
                }

                // NORMAL FIELD
                return (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {field}
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder={`${sec.type} ${field}`}
                      value={pageData[sec.type]?.[field] || ""}
                      onChange={(e) =>
                        updateField(sec.type, field, e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SAVE BAR */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditPage;
