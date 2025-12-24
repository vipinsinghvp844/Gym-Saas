import axios from "axios";
import {
  LoginTokenReduser,
} from "../redecer/AllReducers";
import api from "../../src/services/api"

const token = localStorage.getItem("authtoken");
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const LoginUserAction = (obj12) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost/GymsBackend/auth/login.php/`, {
      username: obj12.login,
      password: obj12.password,
    });

    if (res.status === 200) {
      const user = res.data;
      const userRole = user.roles && user.roles[0] ? user.roles[0] : null;
      if (userRole) {
        localStorage.setItem("firstname", user.first_name);
        dispatch(LoginTokenReduser(res?.data));
        dispatch(LoginUserReduser(res.data));
        return user;
      } else {
        console.error("User role is missing.");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

