import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  fetchExchangeRates,
  selectExchangeRates,
} from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";

function App() {
  const dispatch = useAppDispatch();
  const exchangeRates = useAppSelector(selectExchangeRates);

  useEffect(() => {
    dispatch(fetchExchangeRates());
    dispatch(fetchProducts());
  }, []);

  return <div className="body">{JSON.stringify(exchangeRates)}</div>;
}

export default App;
