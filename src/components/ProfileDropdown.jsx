import { useState, useRef, useEffect } from "react";
import { LogOut, Key, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const name = localStorage.getItem("user_name") || "User";
  const role = localStorage.getItem("role") || "admin";
  const avatar = localStorage.getItem("user_avatar");

  const avatarUrl = avatar
    ? `http://localhost/GymsBackend${avatar}`
    : null;

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* HEADER AVATAR */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full overflow-hidden
        border border-slate-600 bg-slate-800 flex items-center justify-center"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
            }}
          />
        ) : (
          <span className="text-white text-sm font-semibold">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-56 rounded-lg shadow-xl
            bg-slate-900 text-white
            border border-slate-700
          "
        >
          {/* USER INFO */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {name}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {role.replace("_", " ")}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <button
            onClick={() => {
              navigate("/change-password");
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm
              hover:bg-slate-800"
          >
            <Key size={16} /> Change Password
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm
              text-red-400 hover:bg-slate-800"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
