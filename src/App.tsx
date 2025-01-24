import React, { useEffect } from "react";
import { fetchProducts } from "./services/apiServices";
import { fetchExchange } from "./services/exchangeService";

function App() {
  useEffect(() => {
    getProducts();
    getExchange();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getExchange = async () => {
    try {
      const response = await fetchExchange();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return <div className="body"></div>;
}

export default App;
