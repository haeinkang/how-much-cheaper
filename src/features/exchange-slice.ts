import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ExchangeResponse } from "../types/exchange";
import axios from "axios";

// 비동기 thunk 액션 정의: 환율 API 호출
export const fetchExchangeRates = createAsyncThunk<
  ExchangeResponse[],
  void,
  { rejectValue: string }
>("exchange/fetchExchangeRates", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ExchangeResponse[]>(
      "/openapi/exchangeJSON", // 실제 API URL로 변경
      {
        params: {
          authkey: process.env.REACT_APP_AUTH_KEY,
          data: "AP01",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    // 에러 응답이 있을 경우 메시지 반환, 없으면 기본 메시지 사용
    return rejectWithValue(
      // error.response.data.message || error.message ||
      "API 호출 실패"
    );
  }
});

// 슬라이스 상태 타입 정의
interface ExchangeState {
  loaded: boolean;
  exchangeRates: ExchangeResponse[];
  error: string | null;
}

// 초기 상태 정의
const initialState: ExchangeState = {
  loaded: false,
  exchangeRates: [],
  error: null,
};

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loaded = false;
        state.error = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.loaded = true;
        state.exchangeRates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loaded = true;
        state.error = action.payload || "알 수 없는 에러";
      });
  },
});

export const {} = exchangeSlice.actions;

// 상태 선택자 예제
export const selectExchangeRates = (state: RootState) =>
  state.exchange.exchangeRates;

export default exchangeSlice.reducer;
