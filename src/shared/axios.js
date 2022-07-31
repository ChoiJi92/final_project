import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001",
    baseURL: process.env.REACT_APP_BASE_URL,
   
    headers: { "Content-Type": "application/json" },
    // headers: {"Content-Type": "multipart/form-data"},
});

const token = sessionStorage.getItem("token");
instance.defaults.withCredentials = true; 
instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default instance;