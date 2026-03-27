import { useState } from "react";
import api from "../services/api";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    password.length >= 6 && password === confirm;

  const submit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/change-password.php", {
        password,
      });

      // unlock dashboard
      localStorage.setItem("force_password_change", 0);

      alert("Password updated successfully");
      window.location.href = "/gym/dashboard";
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Error updating password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl border shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-100 flex items-center justify-center">
            <Lock className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Change Password
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            For security reasons, please set a new password
          </p>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 pr-10 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Must be at least 6 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`w-full h-10 px-3 border rounded-lg text-sm outline-none ${
              confirm && confirm !== password
                ? "border-red-400 focus:ring-red-500"
                : "focus:ring-indigo-500"
            }`}
            placeholder="Re-enter new password"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={submit}
          disabled={!isValid || loading}
          className={`w-full h-10 rounded-lg text-sm font-medium ${
            !isValid || loading
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {/* Security Hint */}
        <p className="text-xs text-slate-500 text-center">
          🔒 After changing password, all active sessions will remain
          logged in (can be improved later).
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
