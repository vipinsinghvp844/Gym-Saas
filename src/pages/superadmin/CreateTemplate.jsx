import { useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";

const availableSections = [
  { type: "header", fields: ["logo", "menu", "button"] },
  { type: "hero", fields: ["title", "subtitle", "button_text"] },
  { type: "features", fields: ["heading", "items"] },
  { type: "cta", fields: ["text", "button"] },
  { type: "register_form", fields: ["submit_text"] },
  { type: "footer", fields: ["logo", "social", "link_text", "images"] },
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

    alert("Template created successfully");
    setName("");
    setSections([]);
  };

  return (
      <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

        {/* HEADER */}
        <PageHeader
          title="Create Template"
          subtitle="Build a website template by selecting page sections"
        />

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-8">

          {/* TEMPLATE NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Name
            </label>
            <input
              className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Modern Gym Landing"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* AVAILABLE SECTIONS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Add Sections
            </h3>

            <div className="flex flex-wrap gap-2">
              {availableSections.map((sec) => (
                <button
                  key={sec.type}
                  onClick={() => addSection(sec)}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  + {sec.type}
                </button>
              ))}
            </div>
          </div>

          {/* TEMPLATE STRUCTURE */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Template Structure
            </h3>

            {sections.length === 0 && (
              <p className="text-sm text-gray-500">
                No sections added yet
              </p>
            )}

            <div className="space-y-3">
              {sections.map((sec, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {i + 1}. {sec.type}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Fields: {sec.fields.join(", ")}
                    </p>
                  </div>

                  <button
                    onClick={() => removeSection(i)}
                    className="text-xs text-red-600 hover:text-red-800 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={save}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Save Template
            </button>
          </div>

        </div>
      </div>
  );
};

export default CreateTemplate;
