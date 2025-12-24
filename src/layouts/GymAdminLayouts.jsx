import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Users,
  UserCheck,
  UserX,
  CreditCard,
  Receipt,
  Building,
  Palette,
  Globe,
  LifeBuoy,
} from "lucide-react";
import Header from "./Header";
import { useEffect } from "react";
import api from "../services/api";

const Menu = [
  { title: "Dashboard", path: "/gym/dashboard", icon: LayoutDashboard },

  { title: "Pages", path: "/gym/pages", icon: FileText },
  { title: "Templates", path: "/gym/templates", icon: Layers },

  { title: "All Members", path: "/gym/members", icon: Users },
  { title: "Active Members", path: "/gym/members/active", icon: UserCheck },
  { title: "Inactive Members", path: "/gym/members/inactive", icon: UserX },

  { title: "Plans", path: "/gym/payments/plans", icon: CreditCard },
  { title: "Transactions", path: "/gym/payments/transactions", icon: Receipt },

  { title: "Gym Profile", path: "/gym/settings/profile", icon: Building },
  { title: "Branding", path: "/gym/settings/branding", icon: Palette },
  { title: "Domain", path: "/gym/settings/domain", icon: Globe },

  { title: "Tickets", path: "/gym/support/tickets", icon: LifeBuoy },
];

const GymAdminLayout = () => {

  useEffect(() => {
  api.get("/gym/settings/get.php").then(res => {
    const gym = res.data.data;

    localStorage.setItem("primary_color", gym.primary_color);
    localStorage.setItem("secondary_color", gym.secondary_color);

    document.documentElement.style.setProperty(
      "--brand-primary",
      gym.primary_color
    );
  });
}, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1f2937] text-white p-5">
        <h2 className="text-xl font-bold mb-6">Gym Panel</h2>

        <nav className="space-y-1">
          {Menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded text-sm transition
                  ${isActive
                    ? "bg-brand text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GymAdminLayout;
