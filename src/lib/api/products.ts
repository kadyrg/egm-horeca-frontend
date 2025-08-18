import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CartItem } from "../types/types";
import { cookies } from "next/headers";
import {
  Product,
  ProductDetail,
  ProductFullDetail,
  ProductsListAdmin
} from "../types/products";

// Admin

export async function getProductsAdmin() {
  const res = await fetch(`${process.env.ADMIN_API_URL}/products`, {
    method: "GET",
    next: { tags: ["products"] },
  });
  const data: ProductsListAdmin = await res.json();
  return data;
}


// Client

export async function getTopProducts() {
  const locale = await getLocale()

  const res = await fetch(`${process.env.CLIENT_API_URL}/products/top`, {
    headers: { 'Accept-Language': locale }
  });
  const data: Product[] = await res.json();
  return data;
};

export async function getNewProducts() {
  const locale = await getLocale();

  const res = await fetch(`${process.env.CLIENT_API_URL}/products/new`, {
    headers: { 'Accept-Language': locale }
  });
  const data: Product[] = await res.json();
  return data;
};

export async function getProduct({ slug } : { slug: string }) {
  const isDev = process.env.NODE_ENV === "development"
  const locale = await getLocale()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, {
    headers: { 'Accept-Language': locale },
    cache: isDev ? 'no-cache' : 'force-cache',
  });
  if (!res.ok) {
    notFound();
  };
  const data: ProductDetail = await res.json();
  return data;
};

// Above don't touch




export async function getAllProducts() {
  const isDev = process.env.NODE_ENV === "development"
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: isDev ? 'no-cache' : 'force-cache',
  });
  const data: ProductFullDetail[] = await res.json();
  return data;
}




export async function getLikedProducts() {
  const cookieStore = await cookies();
  const likedProductsCookie = cookieStore.get("likes")?.value;
  let likedProductsIds: string[] = []
  if (likedProductsCookie) {
    try {
      likedProductsIds = JSON.parse(likedProductsCookie)
    } catch {
      likedProductsIds = []
    }
  }
  const products = await getAllProducts();
  const filteredProducts = products.filter(product => likedProductsIds.some(likedProductsId => product.id === Number(likedProductsId)))
  return filteredProducts;
};

export async function getCartProducts() {
  const cookieStore = await cookies();
  const cartItemsCookie = cookieStore.get("cartItems")?.value;
  let cartItems: CartItem[] = []
  if (cartItemsCookie) {
    try {
      cartItems = JSON.parse(cartItemsCookie)
    } catch {
      cartItems = []
    }
  }

  const products = await getAllProducts();

  const filteredProducts = products.filter(product => cartItems.some(cartItem => product.id === Number(cartItem.productId)))
  return filteredProducts;
};


