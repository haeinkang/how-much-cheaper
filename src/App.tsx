import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchExchangeRates } from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRates());
    dispatch(fetchProducts());
  }, []);

  // 예시: "/" 경로일 때만 사이드바를 보여주고, 그 외에는 숨깁니다.
  const hasSidebar = location.pathname === "/";

  return (
    <div
      className={`grid-container ${hasSidebar ? "has-sidebar" : "no-sidebar"}`}
    >
      <div className="header">header</div>
      <div className="exchange-info">exchange-info</div>
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites/" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
      <footer className="footer">footer</footer>
    </div>
  );
}

export default App;
