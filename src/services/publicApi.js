import axios from "axios";

const publicApi = axios.create({
<<<<<<< HEAD
  // baseURL: "https://vipinparihar-001-site1.mtempurl.com",
  baseURL: "http://localhost:8000",
=======
  baseURL: "https://vipinparihar-001-site1.mtempurl.com",
  // baseURL: "http://localhost/GymsBackend",
>>>>>>> 46eb76e99cec71c452ed5399c74450ebd564fe0e
});

export default publicApi;
   
