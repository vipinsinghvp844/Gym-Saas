import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login.php", { email, password });
      console.log(res, "res");

      if (res.data.status) {
        const { token, user } = res.data;

        // save auth data
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem(
          "force_password_change",
          user.force_password_change
        );

        // FIRST LOGIN CHECK (MOST IMPORTANT)
        // FORCE PASSWORD CHANGE (ONLY FOR GYM ADMIN)
        if (
          user.role === "gym_admin" &&
          user.force_password_change === 1
        ) {
          navigate("/change-password");
          return;
        }

        // ROLE BASED DASHBOARD
        if (user.role === "super_admin") {
          navigate("/superadmin/dashboard");
        } else if (user.role === "gym_admin") {
          navigate("/gym/dashboard");
        }

      } else {
        alert("Login failed: " + (res.data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
