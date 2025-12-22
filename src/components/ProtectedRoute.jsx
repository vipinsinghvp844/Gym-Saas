import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole, forcePasswordChange } = getAuth();
  const location = useLocation();

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔐 FORCE PASSWORD CHANGE (but allow change-password page)
 if (
  userRole === "gym_admin" &&
  forcePasswordChange === 1 &&
  location.pathname !== "/change-password"
) {
  return <Navigate to="/change-password" />;
}


  // ❌ Role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
