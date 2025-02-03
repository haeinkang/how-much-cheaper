import React, { useEffect } from "react";
import { fetchProducts } from "./services/apiServices";
import { fetchExchange } from "./services/exchangeService";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { increment, selectCount } from "./features/product-slice";

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts();
    getExchange();
    dispatch(increment());
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

  return <div className="body">{count}</div>;
}

export default App;
