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
    w-64 h-screen ${baseBg} text-white
    flex flex-col
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    overflow-hidden
  `}
>
  {/* MOBILE HEADER */}
  <div className="shrink-0 flex items-center justify-between lg:hidden px-5 py-4">
    <h2 className="text-xl font-bold">{title}</h2>
    <button onClick={onClose}>
      <X />
    </button>
  </div>

  {/* DESKTOP TITLE */}
  <h2 className="shrink-0 text-xl font-bold hidden lg:block px-5 py-4">
    {title}
  </h2>

  {/* SCROLLABLE MENU */}
  <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-6">
    {menu.map((group) => (
      <div key={group.section}>
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2 px-3">
          {group.section}
        </p>

        <div className="space-y-1">
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`
                }
              >
                <Icon size={18} />
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    ))}
  </nav>
</aside>

  );
};

export default Sidebar;
