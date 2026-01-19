import axios from "axios";

const publicApi = axios.create({
  // baseURL: "https://hireaiexpert.com/saas-backend",
  baseURL: "http://localhost/GymsBackend",
});

export default publicApi;
