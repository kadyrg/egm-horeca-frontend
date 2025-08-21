import { getLocale } from "next-intl/server";
import { Product } from "../types/products";
import { Category, CategoryDetail } from "../types/categories";

export async function getCategories() {
  const isDev = process.env.NODE_ENV === "development";
  const locale = await getLocale();
  const res = await fetch(`${process.env.API_URL}/categories`, {
    cache: isDev ? "no-cache" : "force-cache",
    headers: { "Accept-Language": locale },
  });
  const data: Category[] = await res.json();
  return data;
}

export async function getCategoryDetail({ slug }: { slug: string }) {
  const locale = await getLocale();
  const isDev = process.env.NODE_ENV === "development";

  const res = await fetch(`${process.env.API_URL}/categories/${slug}`, {
    cache: isDev ? "no-cache" : "force-cache",
    headers: { "Accept-Language": locale },
  });
  const data: CategoryDetail = await res.json();
  return data;
}

export async function getCategoryProducts({
  slug,
  page,
}: {
  slug: string;
  page: number;
}) {
  const locale = await getLocale();
  const isDev = process.env.NODE_ENV === "development";
  const res = await fetch(
    `${process.env.API_URL}/categories/${slug}/products?page=${page}`,
    {
      cache: isDev ? "no-cache" : "force-cache",
      headers: { "Accept-Language": locale },
    },
  );
  const data: Product[] = await res.json();
  return data;
}
