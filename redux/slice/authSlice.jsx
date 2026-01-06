import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  role: localStorage.getItem("role") || null,
  forcePasswordChange:
    Number(localStorage.getItem("force_password_change")) || 0,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state.user = payload.user;
      state.role = payload.user.role;
      state.forcePasswordChange = payload.user.force_password_change;

      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.user.role);
      localStorage.setItem(
        "force_password_change",
        payload.user.force_password_change
      );
    },

    loginFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.forcePasswordChange = 0;

      localStorage.clear();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
