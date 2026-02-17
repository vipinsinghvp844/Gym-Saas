import axios from "axios";

const publicApi = axios.create({
  // baseURL: "https://vipinparihar-001-site1.mtempurl.com",
  baseURL: "http://localhost:8000",
});

export default publicApi;
   
