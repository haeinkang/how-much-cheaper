import { brands, categories } from "../constants/staticData";

// 브랜드 정보
export type BrandList = typeof brands;
export type Brand = BrandList[number];
export type BrandName = Brand["brandName"];

export type CategoryList = typeof categories;
export type Category = CategoryList[number];
export type CategoryName = Category["name"];
export type SubCategoryList = Category["subCategories"];
export type SubCategory = SubCategoryList[number];
export type SubCategoryName = SubCategory["name"];

// 개별 국가 가격 정보
export type Price = {
  country: string; // 국가명
  localPrice: number; // 해당 국가 가격
  currency: string; // 통화
  currencySymbol: string; // 통화 기호
};

// 제품 정보
export type Product = {
  id: string;
  productName: string;
  brandName: BrandName;
  category: Pick<Category, "id" | "name">;
  subCategory: Pick<SubCategory, "id" | "name">;
  domesticPrice: number; // 국내 가격
  prices: Price[];
  url: string;
};
