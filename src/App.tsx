import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { getProducts } from "./services/productService";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getProducts();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return <div className="body"></div>;
}

export default App;
