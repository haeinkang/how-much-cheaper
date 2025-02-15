import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchExchangeRates } from "./features/exchange-slice";
import { fetchProducts } from "./features/product-slice";
import Layout from "./Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dateFormat from "dateformat";
const theme = createTheme();

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const Error404Page = lazy(() => import("./pages/ErrorsPage/Error404"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const now = new Date();
    const effectiveToday = getEffectiveToday(now);
    const effectiveYesterday = new Date(effectiveToday);
    effectiveYesterday.setDate(effectiveToday.getDate() - 1);

    dispatch(fetchExchangeRates({ date: effectiveToday, type: "today" }));
    dispatch(
      fetchExchangeRates({ date: effectiveYesterday, type: "yesterday" })
    );
    dispatch(fetchProducts());
  }, []);

  /**
   * 현재 날짜와 시간을 기준으로 실제 환율 조회에 사용할 '오늘' 날짜를 계산하는 함수
   */
  function getEffectiveToday(currentDate: Date): Date {
    // 복사본 생성 (불변성을 위해)
    const effective = new Date(currentDate);
    const dayOfWeek = dateFormat(currentDate, "ddd");

    // 주말 조건 우선 처리
    if (dayOfWeek === "Sat") {
      effective.setDate(effective.getDate() - 1); // 토요일 -> 금요일
    } else if (dayOfWeek === "Sun") {
      effective.setDate(effective.getDate() - 2); // 일요일 -> 금요일
    } else if (currentDate.getHours() < 11) {
      // 평일이지만 오전 11시 이전이면 아직 오늘 데이터가 업데이트되지 않았으므로 어제로 간주
      effective.setDate(effective.getDate() - 1);
    }
    return effective;
  }

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
