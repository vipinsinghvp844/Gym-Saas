import { NavLink, Outlet } from "react-router-dom";

const Menu = [
  { title: "Dashboard", path: "/superadmin/dashboard" },
  { title: "Gyms", path: "/superadmin/gyms" },
  { title: "Create Gym", path: "/superadmin/create-gym" },
  { title: "Gym Requests", path: "/superadmin/requests" },
  { title: "Templates", path: "/superadmin/templates" },
  { title: "Create Template", path: "/superadmin/templates/create" },
  { title: "Pages", path: "/superadmin/pages" },
  { title: "Create Page", path: "/superadmin/create-page" },
];

const SuperAdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 260, background: "#111", color: "#fff", padding: 15 }}>
        <h3>Super Admin Panel</h3>

        {Menu.map((item) => (
          <div key={item.path} style={{ marginBottom: 10 }}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                color: isActive ? "#fff" : "#aaa",
                textDecoration: "none",
                fontWeight: "bold",
              })}
            >
              {item.title}
            </NavLink>
          </div>
        ))}
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
