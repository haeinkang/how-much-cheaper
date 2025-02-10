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

  return (
    <div className="grid-container">
      <div className="header">header</div>
      <div className="exchange-info">exchange-info</div>
      <div className="content">
        <h2>메인 컨텐츠</h2>
      </div>
      <div className="sidebar">sidebar</div>
      <footer className="footer">footer</footer>
    </div>
  );
}

export default App;
