import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";

const CreatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    slug: "",
    template_id: "",
  });

  useEffect(() => {
    const loadTemplates = async () => {
      const res = await api.get("/templatess/list.php");
      setTemplates(res.data.data || []);
    };

    loadTemplates();
  }, []);

  const submit = async () => {
    if (!form.slug || !form.template_id) {
      alert("Slug and Template are required");
      return;
    }

    await api.post("/pages/create.php", {
      slug: form.slug,
      template_id: Number(form.template_id),
      page_data: {},
    });

    alert("Page created successfully");
    setForm({ slug: "", template_id: "" });
  };

  return (
      <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

        {/* HEADER */}
        <PageHeader
          title="Create Page"
          subtitle="Create a new website page and assign a template"
        />

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">

          {/* SLUG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Slug
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="home, pricing, register"
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be used in the URL (e.g. /home)
            </p>
          </div>

          {/* TEMPLATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.template_id}
              onChange={(e) =>
                setForm({ ...form, template_id: e.target.value })
              }
            >
              <option value="">Select Template</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* ACTION */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={submit}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Create Page
            </button>
          </div>

        </div>
      </div>
  );
};

export default CreatePage;
