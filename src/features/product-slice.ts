import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// 슬라이스 상태 타입 정의
interface ProductState {
  value: number;
}

// 초기 상태 정의
const initialState: ProductState = {
  value: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // PayloadAction<number>로 payload 타입을 number로 지정
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

// 상태 선택자 예제
export const selectCount = (state: RootState) => state.products.value;

export default productSlice.reducer;
