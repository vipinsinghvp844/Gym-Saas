import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GymBillingGuard = ({ children }) => {
  const { user } = useSelector((s) => s.auth);

  const billing = (user?.gym?.billing_status || "").toLowerCase();

  if (billing && billing !== "active") {
    return <Navigate to="/gym/billing-required" replace />;
  }

  return children;
};

export default GymBillingGuard;
