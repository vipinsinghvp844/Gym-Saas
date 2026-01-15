import { useState, useRef, useEffect } from "react";
import { LogOut, Key, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import useAuthUser from "../hooks/useAuthUser";
import avatarPlaceholder from "../assets/react.svg";


const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const { user, loading, refreshUser } = useAuthUser();

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

  // 🔥 listen for avatar updates
  useEffect(() => {
    const handler = () => refreshUser();
    window.addEventListener("user-updated", handler);
    return () => window.removeEventListener("user-updated", handler);
  }, [refreshUser]);

  if (loading || !user) return null;

  // 🔥 cache-busting added
  const profileImage = user.avatar
    ? `http://localhost/GymsBackend${user.avatar}?v=${Date.now()}`
    : avatarPlaceholder;
  

  return (
    <div className="relative" ref={ref}>
      {/* AVATAR */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full overflow-hidden border border-slate-600"
      >
        <img
          src={profileImage}
          alt="User"
          className="w-full h-full object-cover"
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-slate-900 text-white border border-slate-700 z-50">
          {/* USER INFO */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
              <img
                src={profileImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <button
            onClick={() => {
              navigate("/change-password");
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-slate-800"
          >
            <Key size={16} /> Change Password
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-800"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
