import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001",
  // baseURL: "http://localhost:3000",
    // baseURL: "http://13.125.112.232",
    // baseURL: "http://3.36.67.39",
    baseURL: "https://api.choiji.shop",
    // headers: { "Content-Type": "application/json" },
    // headers: {"Content-Type": "multipart/form-data"},
});

// const token = localStorage.getItem("token");

// instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default instance;
