// Admin

import { Category } from "./types";

export type ProductsListView = {
  id: number;
  nameEn: string;
  nameRo: string;
  descriptionEn: string;
  descriptionRo: string;
  price: number;
  stock: number;
  categoryId: number;
  status: boolean;
  isTop: boolean;
  variantsCount: string;
  mainImage: string | null;
  extraImage1: string | null;
  extraImage2: string | null;
  extraImage3: string | null;
  extraImage4: string | null;
  extraImage5: string | null;
  extraImage6: string | null;
};

export type ProductsListAdmin = {
  data: ProductsListView[];
  total: number;
  initial: number;
  last: number;
  totalPages: number;
  page: number;
};


// Client

export type ProductFullDetail = {
  id: number;
  nameEn: string;
  nameRo: string;
  descriptionEn: string;
  descriptionRo: string;
  price: number;
  mainImage: string;
  slugEn: string;
  slugRo: string;
  categoryId: number;
  createdAt: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  price: number;
  slug: string;
};

export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  price: number;
  category: Category;
}
