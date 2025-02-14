import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ExchangeResponse } from "../types/exchange";
import axios from "axios";
import dateFormat from "dateformat";
// 타입 정의: 오늘과 어제 구분
export type ExchangeDataType = "today" | "yesterday";

// 비동기 thunk 액션 정의: 환율 API 호출
export const fetchExchangeRates = createAsyncThunk<
  { rates: ExchangeResponse[]; type: ExchangeDataType },
  { date: Date; type: ExchangeDataType },
  { state: RootState; rejectValue: string }
>(
  "exchange/fetchExchangeRates",
  async ({ date, type }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ExchangeResponse[]>(
        "/openapi/exchangeJSON",
        {
          params: {
            authkey: process.env.REACT_APP_AUTH_KEY,
            data: "AP01",
            searchdate: dateFormat(date, "yyyymmdd"),
          },
        }
      );
      return { rates: response.data, type };
    } catch (error: unknown) {
      // 에러 응답이 있을 경우 메시지 반환, 없으면 기본 메시지 사용
      return rejectWithValue(
        // error.response.data.message || error.message ||
        "API 호출 실패"
      );
    }
  }
);

// 슬라이스 상태 타입 정의
interface ExchangeState {
  loaded: boolean;
  todayExchangeRates: ExchangeResponse[];
  yesterdayExchangeRates: ExchangeResponse[];
  error: string | null;
}

// 초기 상태 정의
const initialState: ExchangeState = {
  loaded: false,
  todayExchangeRates: [],
  yesterdayExchangeRates: [],
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
        const { type, rates } = action.payload;
        state.loaded = true;
        if (type === "today") state.todayExchangeRates = rates;
        if (type === "yesterday") state.yesterdayExchangeRates = rates;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loaded = true;
        state.error = action.payload || "알 수 없는 에러";
      });
  },
});

export const {} = exchangeSlice.actions;

// 상태 선택자
export const selectTodayExchangeRates = (state: RootState) =>
  state.exchange.todayExchangeRates;
export const selectYesterdayExchangeRates = (state: RootState) =>
  state.exchange.yesterdayExchangeRates;

export default exchangeSlice.reducer;
