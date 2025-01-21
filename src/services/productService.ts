import axiosInstance from "../api/axiosInstance";

export const getProducts = () => axiosInstance.get("/products");
