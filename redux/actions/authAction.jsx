import api from "../../src/services/api";
import toast from "react-hot-toast";
import { loginStart, loginSuccess, loginFail } from "../slice/authSlice";

export const loginUser = ({ email, password }, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await api.post("/auth/login.php", {
      email,
      password,
    });

    // ✅ response safety
    if (!res?.data?.status) {
      const msg = res?.data?.message || "Invalid credentials";
      toast.error(msg);
      dispatch(loginFail(msg));
      return;
    }

    const { token, user, gym } = res.data;

    // ✅ save in redux
    dispatch(
      loginSuccess({
        token,
        user,
        gym: gym || null,
      })
    );

    toast.success("Login successful ✅");

    // ✅ BILLING REQUIRED REDIRECT
    // (ये backend अब 403 पर "code":"BILLING_REQUIRED" भेजेगा)
    // but just in case backend future me status:true ke sath bhi bheje
    if (
      user?.role === "gym_admin" &&
      gym?.status === "trial" &&
      gym?.billing_status !== "paid" &&
      gym?.trial_ends_at &&
      new Date(gym.trial_ends_at).getTime() < Date.now()
    ) {
      navigate("/gym/billing-required");
      return;
    }

    // ✅ FORCE PASSWORD CHANGE
    if (user.role === "gym_admin" && user.force_password_change === 1) {
      navigate("/change-password");
      return;
    }

    // ✅ ROLE BASED REDIRECT
    if (user.role === "super_admin") {
      navigate("/superadmin/dashboard");
    } else if (user.role === "gym_admin") {
      navigate("/gym/dashboard");
    } else {
      navigate("/login");
    }
  } catch (err) {
    // ✅ backend errors (401/403/500 etc)
    const message =
      err?.response?.data?.message || "Login failed. Please try again.";

    const code = err?.response?.data?.code;

    // ✅ Trial expired / billing required
    if ("BILLING_REQUIRED" === "BILLING_REQUIRED") {
      toast.error("Trial expired. Billing required.");
      navigate("/gym/billing-required");
      dispatch(loginFail("Billing required"));
      return;
    }

    toast.error(message);
    dispatch(loginFail(message));
  }
};
