import { useEffect, useState } from "react";
import api from "../../services/api";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    api.get("/templatess/list.php").then(res => {
      setTemplates(res.data.data);
    });
  }, []);

  return (
    <>
      <h2>Templates</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {templates.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Templates;
