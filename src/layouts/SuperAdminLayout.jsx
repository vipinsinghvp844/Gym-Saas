import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  PlusSquare,
  ClipboardCheck,
  Layers,
  Plus,
  FileText,
  FilePlus,
} from "lucide-react";
import Header from "./Header";

const Menu = [
  { title: "Dashboard", path: "/superadmin/dashboard", icon: LayoutDashboard },
  { title: "Gyms", path: "/superadmin/gyms", icon: Dumbbell },
  { title: "Create Gym", path: "/superadmin/create-gym", icon: PlusSquare },
  { title: "Gym Requests", path: "/superadmin/requests", icon: ClipboardCheck },
  { title: "Templates", path: "/superadmin/templates", icon: Layers },
  { title: "Create Template", path: "/superadmin/templates/create", icon: Plus },
  { title: "Pages", path: "/superadmin/pages", icon: FileText },
  { title: "Create Page", path: "/superadmin/create-page", icon: FilePlus },
];

const SuperAdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] text-white p-5">
        <h2 className="text-xl font-bold mb-6">Super Admin</h2>

        <nav className="space-y-1">
          {Menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
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

export default SuperAdminLayout;
