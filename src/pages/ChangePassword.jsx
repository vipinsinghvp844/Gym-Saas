import { useState } from "react";
import api from "../services/api";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password || password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/change-password.php", {
        password,
      });

      // unlock dashboard
      localStorage.setItem("force_password_change", 0);

      alert("Password updated successfully");
      window.location.href = "/gym/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <br />

      <button onClick={submit} disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
