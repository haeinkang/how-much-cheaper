import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { fetchProducts } from "./services/productService";
import { fetchExchange } from "./services/exchangeService";
import axios from "axios";

function App() {
  useEffect(() => {
    getProducts();
    getExchange();
  }, []);

  const getExchange = async () => {
    try {
      const response = await axios.get("/exchange", {
        params: {
          authkey: "ym573D4yW5quZUu9QhX1ZUrreg6vIm6V",
          data: "AP01",
        },
        timeout: 10000,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return <div className="body">ddd</div>;
}

export default App;
