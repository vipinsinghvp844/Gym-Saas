import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const GymPages = () => {
  const [pages, setPages] = useState([]);

  const loadPages = async () => {
    const res = await api.get("/gym/pages/list.php");
    setPages(res?.data?.data || []);
  };

  useEffect(() => {
    loadPages();
  }, []);

  return (
    <div>
      <h2>My Website Pages</h2>

      <Link to="/gym/pages/create">
        <button>Create New Page</button>
      </Link>

      <br /><br />

      {pages.length === 0 ? (
        <p>No pages created yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Slug</th>
              <th>Template</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id}>
                <td>{p.slug}</td>
                <td>{p.template_id}</td>
                <td>
                  <Link to={`/gym/pages/edit/${p.id}`}>
                    <button>Edit Content</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GymPages;
