import { useEffect, useState } from "react";
import api from "../../services/api";

const CreateGymPage = () => {
  const [templates, setTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [template, setTemplate] = useState("");

  useEffect(() => {
    api.get("/templates/list.php").then((res) => {
      setTemplates(res.data.data);
    });
  }, []);

  const createPage = async () => {
    await api.post("/gym/pages/create.php", {
      title,
      slug,
      template_id: template,
    });

    alert("Page created");
    window.location.href = "/gym/pages";
  };

  return (
    <div>
      <h2>Create Website Page</h2>

      <input
        placeholder="Page title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Slug (e.g. about)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      >
        <option value="">Select Template</option>
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <br /><br />
      <button onClick={createPage}>Create Page</button>
    </div>
  );
};

export default CreateGymPage;
