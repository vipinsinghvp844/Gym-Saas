import api from "../../src/services/api";
import toast from "react-hot-toast";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../slice/authSlice";

export const loginUser = ({ email, password }, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await api.post("/auth/login.php", {
      email,
      password,
    });

    if (!res.data.status) {
      toast.error(res.data.message || "Invalid credentials");
      dispatch(loginFail(res.data.message || "Invalid credentials"));
      return;
    }

    const { token, user } = res.data;

    dispatch(
      loginSuccess({
        token,
        user,
      })
    );
    toast.success("Login successful");

    /* FORCE PASSWORD CHANGE */
    if (user.role === "gym_admin" && user.force_password_change === 1) {
      navigate("/change-password");
      return;
    }

    /* ROLE BASED REDIRECT */
    if (user.role === "super_admin") {
      navigate("/superadmin/dashboard");
    } else if (user.role === "gym_admin") {
      navigate("/gym/dashboard");
    }
  } catch (err) {
    toast.error("Login failed. Please try again.");
    dispatch(loginFail("Login failed. Please try again."));
  }
};
