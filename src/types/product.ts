// 브랜드 정보
type Brand = {
  id: string;
  brandName: string;
};

// 메인 카테고리 (예: 아우터, 상의, 하의 등)
type Category = {
  id: string;
  name: string;
};

// 서브 카테고리 (예: 코트, 재킷, 팬츠 등)
type SubCategory = {
  id: string;
  name: string;
  parentCategoryId: string; // 해당 서브카테고리가 속한 메인 카테고리 ID
};

// 개별 국가 가격 정보
type Price = {
  country: string; // 국가명
  local_price: number; // 해당 국가 가격
  currency: string; // 통화
  currency_symbol: string; // 통화 기호
};

// 제품 정보
type Product = {
  id: string;
  product_name: string;
  brand: Brand;
  category: Category;
  subCategory: SubCategory;
  domestic_price: number; // 국내 가격
  prices: Price[];
  url: string;
};
