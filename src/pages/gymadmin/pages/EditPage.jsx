import GymAdminLayouts from "../../../layouts/GymAdminLayouts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const EditGymPage = () => {
  const { id } = useParams();
  const [structure, setStructure] = useState(null);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    const res = await api.get(`/gym/pages/get.php?id=${id}`);
    const page = res.data.data;

    setStructure(JSON.parse(page.structure_json));
    setPageData(JSON.parse(page.page_data_json || "{}"));
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

  const updateArrayField = (section, field, value) => {
    const arrayValue = value
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    updateField(section, field, arrayValue);
  };

  const save = async () => {
    await api.post("/gym/pages/update-content.php", {
      page_id: id,
      page_data: pageData,
    });
    alert("Page updated");
  };

  if (!structure) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Page Content</h2>

      {structure.sections.map((sec) => (
        <div key={sec.type} style={{ marginBottom: 30 }}>
          <h3>{sec.type.toUpperCase()}</h3>

          {sec.fields.map((field) => {
            const value = pageData?.[sec.type]?.[field] || "";

            const isArrayField = field === "items";

            return (
              <div key={field} style={{ marginBottom: 10 }}>
                {isArrayField ? (
                  <textarea
                    placeholder={`${sec.type} ${field} (comma separated)`}
                    value={Array.isArray(value) ? value.join(", ") : ""}
                    onChange={(e) =>
                      updateArrayField(sec.type, field, e.target.value)
                    }
                  />
                ) : (
                  <input
                    placeholder={`${sec.type} ${field}`}
                    value={value}
                    onChange={(e) =>
                      updateField(sec.type, field, e.target.value)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}

      <button onClick={save}>Save Page</button>
    </div>
  );
};

export default EditGymPage;
