import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ExchangeData, ExchangeDiff } from "../types/exchange";
import axios from "axios";
import dateFormat from "dateformat";
import map from "lodash/map";
import find from "lodash/find";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";
// 타입 정의: 오늘과 어제 구분
export type ExchangeDataType = "today" | "yesterday";

/** 어제 환율과 비교 */
const calculateDiff = (
  todayExchanges: ExchangeData[],
  yesterdayExchanges: ExchangeData[]
): ExchangeDiff[] =>
  map(todayExchanges, (today): ExchangeDiff => {
    const yesterday = find(
      yesterdayExchanges,
      (o) => o.cur_unit === today.cur_unit
    );

    // 어제 데이터가 없는 경우엔 0으로 처리
    const yesterdayValue = yesterday
      ? parseFloat(yesterday.deal_bas_r.replace(/,/g, ""))
      : 0;
    const todayValue = parseFloat(today.deal_bas_r.replace(/,/g, ""));

    const diff = todayValue - yesterdayValue;
    const percentDiff =
      yesterdayValue !== 0 ? (diff / yesterdayValue) * 100 : 0;

    return {
      cur_unit: today.cur_unit,
      diff: diff.toFixed(1),
      percentDiff: percentDiff.toFixed(1),
    };
  });

// 비동기 thunk 액션 정의: 환율 API 호출
export const fetchExchangeRates = createAsyncThunk<
  { rates: ExchangeData[]; type: ExchangeDataType },
  { date: Date; type: ExchangeDataType },
  { state: RootState; rejectValue: string }
>(
  "exchange/fetchExchangeRates",
  async ({ date, type }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ExchangeData[]>(
        "/openapi/exchangeJSON",
        {
          params: {
            authkey: process.env.REACT_APP_AUTH_KEY,
            data: "AP01",
            searchdate: dateFormat(date, "yyyymmdd"),
          },
        }
      );
      const rates = data.filter(
        (o) =>
          o.cur_unit === "JPY(100)" ||
          o.cur_unit === "HKD" ||
          o.cur_unit === "EUR" ||
          o.cur_unit === "USD"
      );
      return { rates, type };
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
  todayLoaded: boolean;
  yesterdayLoaded: boolean;
  todayExchangeRates: ExchangeData[];
  yesterdayExchangeRates: ExchangeData[];
  diffExchangeRates: ExchangeDiff[];
  error: string | null;
}

// 초기 상태 정의
const initialState: ExchangeState = {
  loaded: false,
  todayLoaded: false,
  yesterdayLoaded: false,
  todayExchangeRates: [],
  yesterdayExchangeRates: [],
  diffExchangeRates: [],
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
        if (type === "today") {
          state.todayExchangeRates = rates;
          state.todayLoaded = true;
        }
        if (type === "yesterday") {
          state.yesterdayExchangeRates = rates;
          state.yesterdayLoaded = true;
        }

        // 두 날짜의 데이터가 모두 로드되었을 때 diff 계산
        if (state.todayLoaded && state.yesterdayLoaded) {
          state.diffExchangeRates = calculateDiff(
            state.todayExchangeRates,
            state.yesterdayExchangeRates
          );
        }
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
export const selectDiffExchangeRates = (state: RootState) =>
  state.exchange.diffExchangeRates;

// 오늘 환율 데이터 배열을 받아서 { [cur_unit]: deal_bas_r } 형태로 변환하는 선택자
export const selectTodayDealBasRByCurrency = createSelector(
  [(state: RootState) => state.exchange.todayExchangeRates],
  (todayRates): Record<string, number> =>
    mapValues(keyBy(todayRates, "cur_unit"), (exchange: ExchangeData) =>
      parseFloat(exchange.deal_bas_r.replace(/,/g, ""))
    )
);

export default exchangeSlice.reducer;
