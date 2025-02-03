import { configureStore } from "@reduxjs/toolkit";
// ... (리듀서 임포트 등)
import productReducer from "../features/product-slice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

// 스토어 자체에서 상태 타입과 dispatch 타입을 유추함
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
