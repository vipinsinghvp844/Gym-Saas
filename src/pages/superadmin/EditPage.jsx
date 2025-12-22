import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";

const normalizeValue = (value, field) => {
  // for list fields like features.items
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

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const res = await api.get(`/pages/get.php?id=${id}`);
    const page = res.data.data;

    const struct = JSON.parse(page.structure_json);
    const data = JSON.parse(page.page_data_json || "{}");

    // 🔐 normalize data for editor
    const normalized = {};
    struct.sections.forEach((sec) => {
      normalized[sec.type] = {};
      sec.fields.forEach((field) => {
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
    await api.post("/pages/update-content.php", {
      page_id: id,
      page_data: pageData,
    });
    alert("Page updated");
  };

  if (!structure) return <p>Loading...</p>;

  return (
    <>
      <h2>Edit Page Content</h2>

      {structure.sections.map((sec) => (
        <div key={sec.type} style={{ marginBottom: 30 }}>
          <h3>{sec.type.toUpperCase()}</h3>

          {sec.fields.map((field) => {
            // 🔹 LIST FIELD (items)
            if (field === "items") {
              return (
                <textarea
                  key={field}
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
              );
            }

            // 🔹 NORMAL TEXT FIELD
            return (
              <input
                key={field}
                placeholder={`${sec.type} ${field}`}
                value={pageData[sec.type]?.[field] || ""}
                onChange={(e) =>
                  updateField(sec.type, field, e.target.value)
                }
              />
            );
          })}
        </div>
      ))}

      <button onClick={save}>Save Page</button>
    </>
  );
};

export default EditPage;
