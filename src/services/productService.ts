import axios from "axios";

export const fetchProducts = () => axios.get("/api/products");
