import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  fetchExchangeRates,
  selectExchangeRates,
} from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";
import thumbnail0JPG from "./assets/images/thumbnails/thumbnail-0.jpg";
import thumbnail2JPG from "./assets/images/thumbnails/thumbnail-2.jpg";
import thumbnail3JPG from "./assets/images/thumbnails/thumbnail-3.jpg";
import thumbnail0Webp from "./assets/images/thumbnails/_thumbnail-0.webp";
import thumbnail2Webp from "./assets/images/thumbnails/_thumbnail-2.webp";
import thumbnail3Webp from "./assets/images/thumbnails/_thumbnail-3.webp";

function App() {
  const dispatch = useAppDispatch();
  const exchangeRates = useAppSelector(selectExchangeRates);

  useEffect(() => {
    dispatch(fetchExchangeRates());
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="body">
      <picture>
        <source width={300} srcSet={thumbnail0Webp} type="image/webp" />
        <img src={thumbnail0JPG} alt="" />
      </picture>
    </div>
  );
}

export default App;
