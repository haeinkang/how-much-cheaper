import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_MOCK_SERVER_URL,
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
