import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({
  title,
  menu,
  isOpen,
  onClose,
  activeClass = "bg-indigo-600",
  baseBg = "bg-[#0f172a]",
}) => {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 ${baseBg} text-white p-5
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* MOBILE HEADER */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* DESKTOP TITLE */}
      <h2 className="text-xl font-bold mb-6 hidden lg:block">
        {title}
      </h2>

      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded text-sm transition
                ${
                  isActive
                    ? `${activeClass} text-white`
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
  );
};

export default Sidebar;
