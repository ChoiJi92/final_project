import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
   
    headers: { "Content-Type": "application/json" },
});

const token = sessionStorage.getItem("token");
instance.defaults.withCredentials = true; 
instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;

export default instance;