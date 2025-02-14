import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchExchangeRates } from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";
import Layout from "./Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const Error404Page = lazy(() => import("./pages/ErrorsPage/Error404"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const now = new Date();
    const today = new Date();
    const yesterday = new Date();

    // 현재 시간이 11시 이전인지 확인
    if (now.getHours() < 11) {
      today.setDate(today.getDate() - 1); // 오늘 날짜를 어제로 변경
    }
    dispatch(fetchExchangeRates({ date: today, type: "today" }));

    // 어제 날짜를 계산 (오늘이 변경되었으면 이틀 전이 됨)
    yesterday.setDate(today.getDate() - 1);
    dispatch(fetchExchangeRates({ date: yesterday, type: "yesterday" }));

    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
