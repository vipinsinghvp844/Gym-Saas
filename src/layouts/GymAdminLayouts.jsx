import { NavLink, Outlet } from "react-router-dom";

const Menu = [
  { title: "Dashboard", path: "/gym/dashboard" },

  {
    title: "Website",
    children: [
      { title: "Pages", path: "/gym/pages" },
      { title: "Templates", path: "/gym/templates" },
    ],
  },
  {
    title: "Members",
    children: [
      { title: "All Members", path: "/gym/members" },
      { title: "Active", path: "/gym/members/active" },
      { title: "Inactive", path: "/gym/members/inactive" },
    ],
  },
  {
    title: "Payments",
    children: [
      { title: "Plans", path: "/gym/payments/plans" },
      { title: "Transactions", path: "/gym/payments/transactions" },
    ],
  },
  {
    title: "Settings",
    children: [
      { title: "Gym Profile", path: "/gym/settings/profile" },
      { title: "Branding", path: "/gym/settings/branding" },
      { title: "Domain", path: "/gym/settings/domain" },
    ],
  },
  {
    title: "Support",
    children: [{ title: "Tickets", path: "/gym/support/tickets" }],
  },
];

const GymAdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 260, background: "#111", color: "#fff", padding: 15 }}>
        <h3>Gym Panel</h3>

        {Menu.map((item) => (
          <div key={item.title} style={{ marginBottom: 10 }}>
            <strong>{item.title}</strong>

            {item.children && (
              <ul style={{ paddingLeft: 15 }}>
                {item.children.map((sub) => (
                  <li key={sub.path}>
                    <NavLink
                      to={sub.path}
                      style={({ isActive }) => ({
                        color: isActive ? "#fff" : "#aaa",
                        textDecoration: "none",
                      })}
                    >
                      {sub.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
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

export default GymAdminLayout;
