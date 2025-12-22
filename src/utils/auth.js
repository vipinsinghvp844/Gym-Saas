export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    forcePasswordChange: Number(
      localStorage.getItem("force_password_change")
    ),
  };
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
