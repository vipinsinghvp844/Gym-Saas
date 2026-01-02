import axios from "axios";

const api = axios.create({
  // baseURL: "https://hireaiexpert.com/saas-backend",
  baseURL: "http://localhost/GymsBackend",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚪 Auto logout on auth failure
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired / invalid
      localStorage.removeItem("token");

      // Optional: remove user info if stored
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
