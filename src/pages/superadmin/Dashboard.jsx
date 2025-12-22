import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/super_admin.php").then((res) => {
      setStats(res.data.data);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <>
      <h1>Super Admin Dashboard</h1>

      <p>Total Gyms: {stats.total_gyms}</p>
      <p>Active Gyms: {stats.active_gyms}</p>
      <p>Total Users: {stats.total_users}</p>

      <h3>Latest Gyms</h3>
      <ul>
        {stats.latest_gyms.map((g) => (
          <li key={g.id}>{g.name} ({g.slug})</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
