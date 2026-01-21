import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost/GymsBackend",
  baseURL: "https://gym-saas-backend.infinityfreeapp.com",
  withCredentials: false, // true tabhi jab cookies use ho
});

//  Attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ❗ DO NOT set Content-Type manually for FormData
    return config;
  },
  (error) => Promise.reject(error)
);

//  Auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
