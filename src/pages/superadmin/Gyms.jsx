import { useEffect, useState } from "react";
import api from "../../services/api";

const Gyms = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    api.get("/gyms/list.php").then((res) => {
      setGyms(res.data.data);
    });
  }, []);

  return (
    <>
      <h2>All Gyms</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.name}</td>
              <td>{g.slug}</td>
              <td>{g.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default Gyms;
