import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost/GymsBackend",
});

export default publicApi;
