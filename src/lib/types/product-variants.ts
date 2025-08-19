export type ProductVariantsListView = {
  id: number;
  nameEn: string;
  nameRo: string;
  price: number;
  stock: number;
  productVariantTypeId: number;
};

export type ProductVariantsListAdmin = {
  data: ProductVariantsListView[];
  total: number;
  initial: number;
  last: number;
  totalPages: number;
  page: number;
};
