import { useEffect, useState } from "react";
import api from "../../services/api";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";

const CreatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    slug: "",
    template_id: "",
    page_data: {}
  });

  useEffect(() => {
    api.get("/templatess/list.php").then(res => {
      setTemplates(res.data.data);
    });
  }, []);

  const submit = async () => {
  if (!form.slug || !form.template_id) {
    alert("Slug and Template are required");
    return;
  }

  await api.post("/pages/create.php", {
    slug: form.slug,
    template_id: Number(form.template_id),
    page_data: {}
  });

  alert("Page created");
};

  return (
    <>
      <h2>Create Page</h2>

      <input
        placeholder="Slug (home, pricing, register)"
        value={form.slug}
        onChange={e => setForm({...form,slug:e.target.value})}
      />

      <select
        value={form.template_id}
        onChange={e => setForm({...form,template_id:e.target.value})}
      >
        <option value="">Select Template</option>
        {templates.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <br /><br />
      <button onClick={submit}>Create Page</button>
    </>
  );
};

export default CreatePage;
