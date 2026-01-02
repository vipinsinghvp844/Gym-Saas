import { useState } from "react";
import {
  Bell,
  Fullscreen,
  Moon,
  Sun,
  Monitor,
  Search,
  Settings,
  User,
} from "lucide-react";
import { applyTheme } from "../utils/theme";
import ProfileDropdown from "../components/ProfileDropdown";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );


  const FetchUser = async ()=>{
      try{
        const res = await api.get()
      }catch(e){
        console.error(e,"Fetch User Failed")
      }
  }

  const changeTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
    setOpen(false);
  };

  return (
    <header className="h-16 bg-[#020617] border-b border-gray-800 flex items-center justify-between px-6">

      {/* SEARCH */}
      <div className="
        flex items-center gap-2 w-1/3 
        bg-gray-100 dark:bg-slate-800 
        px-3 py-2 rounded
      ">
        <button
  onClick={onMenuClick}
  className="lg:hidden text-gray-400"
>
  ☰
</button>

        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search..."
          className="
            w-full bg-transparent outline-none text-sm
            text-gray-700 dark:text-gray-200
          "
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative">
        <Fullscreen className="cursor-pointer text-gray-500 dark:text-gray-300" />

        {/* THEME DROPDOWN */}
        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            {theme === "dark" ? (
              <Moon className="text-gray-500 dark:text-gray-300" />
            ) : (
              <Sun className="text-gray-500 dark:text-gray-300" />
            )}
          </button>

          {open && (
            <div className="
              absolute right-0 mt-3 w-40 
              bg-white dark:bg-slate-800 
              border border-gray-200 dark:border-slate-700
              rounded shadow text-sm
            ">
              <button
                onClick={() => changeTheme("light")}
                className="flex items-center gap-2 w-full px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-slate-700
                "
              >
                <Sun size={16} /> Light
              </button>

              <button
                onClick={() => changeTheme("dark")}
                className="flex items-center gap-2 w-full px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-slate-700
                "
              >
                <Moon size={16} /> Dark
              </button>

              <button
                onClick={() => changeTheme("system")}
                className="flex items-center gap-2 w-full px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-slate-700
                "
              >
                <Monitor size={16} /> System
              </button>
            </div>
          )}
        </div>

        <Bell className="cursor-pointer text-gray-500 dark:text-gray-300" />
        <Link to={"setting/profile"}>
        <Settings className="cursor-pointer text-brand" />
        </Link>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
