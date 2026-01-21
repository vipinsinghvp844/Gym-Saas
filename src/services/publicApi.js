import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://gym-saas-backend.infinityfreeapp.com",
  // baseURL: "http://localhost/GymsBackend",
});

export default publicApi;
