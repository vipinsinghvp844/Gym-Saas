import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  Edit,
  CreditCard,
  MoreVertical,
  UserCog,
//   LockReset,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateGymStatus } from "../../redux/actions/gymAction";
// ✅ (optional) deleteGym, resetOwnerPassword, impersonateGymAdmin actions baad me add karna

const GymRowActions = ({ gym }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onView = () => {
    navigate(`/superadmin/gyms/${gym.id}`);
  };

  const onEdit = () => {
    navigate(`/superadmin/gyms/${gym.id}/edit`);
  };

  const onBilling = () => {
    navigate(`/superadmin/gyms/${gym.id}/billing`);
  };

  const onToggleStatus = async () => {
    // ✅ status: active / inactive
    dispatch(updateGymStatus(gym.id, gym.status));
    setOpen(false);
  };

  const onResetPassword = async () => {
    setOpen(false);

    // ✅ placeholder (tum backend action add karoge)
    toast("Reset password API pending");
  };

  const onLoginAsOwner = async () => {
    setOpen(false);

    // ✅ placeholder (impersonation backend action)
    toast("Login as owner API pending");
  };

  const onDeleteGym = async () => {
    setOpen(false);

    const ok = confirm(
      `Are you sure you want to delete "${gym.name}"?\nThis action cannot be undone.`
    );

    if (!ok) return;

    // ✅ placeholder (delete API pending)
    toast.error("Delete API pending");
  };

  return (
    <td className="px-6 py-4">
      <div className="flex items-center gap-1 relative" ref={menuRef}>
        {/* VIEW */}
        <button
          onClick={onView}
          title="View"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* EDIT */}
        <button
          onClick={onEdit}
          title="Edit"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition"
        >
          <Edit className="w-4 h-4" />
        </button>

        {/* BILLING */}
        <button
          onClick={onBilling}
          title="Billing"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition"
        >
          <CreditCard className="w-4 h-4" />
        </button>

        {/* MORE MENU */}
        <button
          onClick={() => setOpen((p) => !p)}
          title="More"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-10 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
            <button
              onClick={onToggleStatus}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              {gym.status === "active" ? (
                <>
                  <Ban className="w-4 h-4 text-red-500" />
                  Suspend Gym
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Activate Gym
                </>
              )}
            </button>

            <button
              onClick={onResetPassword}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              <LockReset className="w-4 h-4" />
              Reset Owner Password
            </button>

            <button
              onClick={onLoginAsOwner}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              <UserCog className="w-4 h-4" />
              Login as Owner
            </button>

            <div className="h-px bg-slate-200" />

            <button
              onClick={onDeleteGym}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Gym
            </button>
          </div>
        )}
      </div>
    </td>
  );
};

export default GymRowActions;
    