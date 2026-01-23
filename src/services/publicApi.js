import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://vipinparihar-001-site1.mtempurl.com",
  // baseURL: "http://localhost/GymsBackend",
});

export default publicApi;
