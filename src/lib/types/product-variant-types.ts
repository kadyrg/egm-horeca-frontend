export type ProductVariantTypesListView = {
  id: number;
  nameEn: string;
  nameRo: string;
};

export type ProductVariantTypesListAdmin = {
  data: ProductVariantTypesListView[]
  total: number;
  initial: number;
  last: number;
  totalPages: number;
  page: number;
}
