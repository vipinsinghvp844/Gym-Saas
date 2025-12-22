import GymAdminLayouts from "../../layouts/GymAdminLayouts";
import { getAuth } from "../../utils/auth";

const GymDashboard = () => {
  const { forcePasswordChange } = getAuth();

  if (forcePasswordChange === 1) {
    return <p>Please change your password to continue.</p>;
  }

  return (
    <div>
      <h2>Gym Dashboard</h2>
    </div>
  );
};

export default GymDashboard;
