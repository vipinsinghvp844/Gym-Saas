import { useState } from "react";
import api from "../../services/api";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";

const availableSections = [
    {type:"header", fields:["logo", "menu", "button"]},
  { type: "hero", fields: ["title", "subtitle", "button_text"] },
  { type: "features", fields: ["heading", "items"] },
  { type: "cta", fields: ["text", "button"] },
  { type: "register_form", fields: ["submit_text"] },
  {type: "footer", fields: ["logo", "social", "link_text", "images"]}
];

const CreateTemplate = () => {
  const [name, setName] = useState("");
  const [sections, setSections] = useState([]);

  const addSection = (sec) => {
    setSections([...sections, sec]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (!name || sections.length === 0) {
      alert("Template name & at least one section required");
      return;
    }

    await api.post("/templatess/create.php", {
      name,
      structure: { sections },
    });

    alert("Template created");
    setName("");
    setSections([]);
  };

  return (
    <>
      <h2>Create Template</h2>

      <input
        placeholder="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3>Add Sections</h3>

      {availableSections.map((sec) => (
        <button
          key={sec.type}
          onClick={() => addSection(sec)}
          style={{ marginRight: 10 }}
        >
          + {sec.type}
        </button>
      ))}

      <h3>Template Structure</h3>

      {sections.map((sec, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10 }}>
          <strong>{sec.type}</strong>
          <p>Fields: {sec.fields.join(", ")}</p>
          <button onClick={() => removeSection(i)}>Remove</button>
        </div>
      ))}

      <br />
      <button onClick={save}>Save Template</button>
    </>
  );
};

export default CreateTemplate;
