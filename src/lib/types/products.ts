import { Category } from "./categories";

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

type VariantProducts = {
  variantName: string
  slug: string
}

type Variant = {
  variantTypeName: string;
  products: VariantProducts[];
}

export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: Category;
  variants: Variant[]
};
