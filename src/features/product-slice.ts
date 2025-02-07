import type { RootState } from "../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Product,
  Category,
  Brand,
  CategoryList,
  BrandList,
} from "../types/product";
import { categories, brands } from "../constants/staticData";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState; rejectValue: string }
>("product/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<Product[]>("/api/products");
    return data;
  } catch (error: unknown) {
    return rejectWithValue("API 호출 실패");
  }
});

// 슬라이스 상태 타입 정의
interface ProductState {
  categories: CategoryList;
  brands: BrandList;
  products: Product[]; // 상품 목록
  productDetail: Product | null; // 선택된 상품의 상세 정보
  searchResults: Product[]; // 검색 결과 (필요시 사용)
  loaded: boolean; // 로딩 상태
  error: null; // 에러 메시지
}

// 초기 상태 정의
const initialState: ProductState = {
  categories,
  brands,
  products: [], // 상품 목록
  productDetail: null, // 선택된 상품의 상세 정보
  searchResults: [], // 검색 결과 (필요시 사용)
  loaded: false, // 로딩 상태
  error: null, // 에러 메시지
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loaded = true;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loaded = true;
      });
  },
});

export const {} = productSlice.actions;

// 상태 선택자 예제
export const selectProducts = (state: RootState) => state.products.products;

export default productSlice.reducer;
