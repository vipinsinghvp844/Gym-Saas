export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    forcePasswordChange: Number(
      localStorage.getItem("force_password_change")) || 0 ,
      gym: localStorage.getItem("gym")
      ? JSON.parse(localStorage.getItem("gym"))
      : null,
  };
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
