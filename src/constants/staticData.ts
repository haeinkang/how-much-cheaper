export const brands = [
  { id: "0", brandName: "Gucci" },
  { id: "1", brandName: "Burberry" },
  { id: "2", brandName: "Celine" },
  { id: "3", brandName: "Bottega Veneta" },
  { id: "4", brandName: "Louis Vuitton" },
  { id: "5", brandName: "Dior" },
  { id: "6", brandName: "Loewe" },
] as const;

export const categories = [
  {
    id: "0",
    name: "아우터",
    subCategories: [
      { id: "0", name: "코트" },
      { id: "1", name: "재킷" },
      { id: "2", name: "패딩" },
    ],
  },
  {
    id: "1",
    name: "상의",
    subCategories: [
      { id: "3", name: "니트" },
      { id: "4", name: "블라우스" },
      { id: "5", name: "티셔츠" },
      { id: "6", name: "셔츠" },
      { id: "7", name: "스웨트셔츠" },
    ],
  },
  {
    id: "2",
    name: "하의",
    subCategories: [
      { id: "8", name: "팬츠" },
      { id: "9", name: "스커트" },
    ],
  },
  {
    id: "3",
    name: "원피스",
    subCategories: [
      { id: "10", name: "미니 원피스" },
      { id: "11", name: "미디 원피스" },
      { id: "12", name: "맥시 원피스" },
      { id: "13", name: "점프수트" },
    ],
  },
  {
    id: "4",
    name: "슈즈",
    subCategories: [
      { id: "14", name: "스니커즈" },
      { id: "15", name: "힐" },
      { id: "16", name: "부츠" },
      { id: "17", name: "샌들" },
      { id: "18", name: "플랫슈즈" },
    ],
  },
  {
    id: "5",
    name: "가방",
    subCategories: [
      { id: "19", name: "토트백" },
      { id: "20", name: "숄더백" },
      { id: "21", name: "크로스백" },
      { id: "22", name: "백팩" },
      { id: "23", name: "클러치" },
    ],
  },
  {
    id: "6",
    name: "악세서리",
    subCategories: [
      { id: "24", name: "지갑" },
      { id: "25", name: "머플러" },
      { id: "26", name: "모자" },
      { id: "27", name: "벨트" },
      { id: "28", name: "장갑" },
    ],
  },
] as const;
