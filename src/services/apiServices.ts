import axios from "axios";

export const fetchProducts = () => axios.get("/api/products");
export const fetchBrands = () => axios.get("/api/brands");
export const fetchCategory = () => axios.get("/api/categories");
