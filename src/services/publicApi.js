import axios from "axios";

const publicApi = axios.create({
  // baseURL: "https://saas-backend-production-42a7.up.railway.app",
  baseURL: "http://localhost/GymsBackend",
});

export default publicApi;
