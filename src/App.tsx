import React, { useEffect } from "react";
import { fetchProducts } from "./services/apiServices";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  fetchExchangeRates,
  selectExchangeRates,
} from "./features/exchange-slice";

function App() {
  const dispatch = useAppDispatch();
  const exchangeRates = useAppSelector(selectExchangeRates);

  useEffect(() => {
    dispatch(fetchExchangeRates());
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return <div className="body">{JSON.stringify(exchangeRates)}</div>;
}

export default App;
