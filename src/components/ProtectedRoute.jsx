import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

const isTrialExpired = (trialEndsAt) => {
  if (!trialEndsAt) return false;
  const ts = new Date(trialEndsAt).getTime();
  if (Number.isNaN(ts)) return false;
  return ts < Date.now();
};

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole, forcePasswordChange, gym } = getAuth();
  const location = useLocation();

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 FORCE PASSWORD CHANGE (Gym Admin only)
  if (
    userRole === "gym_admin" &&
    forcePasswordChange === 1 &&
    location.pathname !== "/change-password"
  ) {
    return <Navigate to="/change-password" replace />;
  }

  /* ==========================
     ✅ BILLING REQUIRED LOCK
     Only for gym_admin
  ========================== */
  if (userRole === "gym_admin") {
    const billingStatus = (gym?.billing_status || "").toLowerCase(); // trial | unpaid | paid
    const trialEndsAt = gym?.trial_ends_at;

    const expired = isTrialExpired(trialEndsAt);

    // अगर paid नहीं है और trial expired है => lock
    if (billingStatus !== "paid" && expired) {
      // allow billing-required page itself
      if (location.pathname !== "/gym/billing-required") {
        return <Navigate to="/gym/billing-required" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;
