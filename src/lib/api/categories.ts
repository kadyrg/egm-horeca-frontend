import { getLocale } from "next-intl/server";
import { Category, CategoryDetail } from "../types/metadata";
import { CategoryListAdmin, CategoryListViewAll } from "../types/categories";
import { Product } from "../types/products";

// Admin

export async function getCategoriesAdmin({ page }: { page: number }) {
  const res = await fetch(
    `${process.env.ADMIN_API_URL}/categories/?page=${page}`,
    {
      method: "GET",
      next: { tags: ["categories"] },
    },
  );
  const data: CategoryListAdmin = await res.json();
  return data;
}

export async function getAllCategoriesAdmin() {
  const res = await fetch(`${process.env.ADMIN_API_URL}/categories/all`, {
    method: "GET",
    next: { tags: ["categories"] },
  });
  const data: CategoryListViewAll[] = await res.json();
  return data;
}

// Client

export async function getCategories() {
  const isDev = process.env.NODE_ENV === "development";
  const locale = await getLocale();
  const res = await fetch(`${process.env.CLIENT_API_URL}/categories`, {
    cache: isDev ? "no-cache" : "force-cache",
    headers: { "Accept-Language": locale },
  });
  const data: Category[] = await res.json();
  return data;
}

export async function getCategoryDetail({ slug }: { slug: string }) {
  const locale = await getLocale();
  const isDev = process.env.NODE_ENV === "development";

  const res = await fetch(`${process.env.CLIENT_API_URL}/categories/${slug}`, {
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
    `${process.env.CLIENT_API_URL}/categories/${slug}/products?page=${page}`,
    {
      cache: isDev ? "no-cache" : "force-cache",
      headers: { "Accept-Language": locale },
    },
  );
  const data: Product[] = await res.json();
  return data;
}
