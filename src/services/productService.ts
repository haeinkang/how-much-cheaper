import axiosInstance from "../api/axiosInstance";

export const fetchProducts = () => axiosInstance.get("/api/products");
