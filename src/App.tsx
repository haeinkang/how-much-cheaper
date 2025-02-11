import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchExchangeRates } from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";
import Layout from "./Layout";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const Error404Page = lazy(() => import("./pages/ErrorsPage/Error404"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRates());
    dispatch(fetchProducts());
  }, []);

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites/" element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Suspense>
  );
}

export default App;
