import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  Product,
  ProductDetail,
  ProductFullDetail,
} from "../types/products";
import { CartItem } from "../types/cart-items";

export async function getTopProducts() {
  const locale = await getLocale();

  const res = await fetch(`${process.env.API_URL}/products/top`, {
    cache: "force-cache",
    headers: { "Accept-Language": locale },
    next: { tags: [`products`] },
  });
  const data: Product[] = await res.json();
  return data;
}

export async function getNewProducts() {
  const locale = await getLocale();

  const res = await fetch(`${process.env.API_URL}/products/new`, {
    cache: "force-cache",
    headers: { "Accept-Language": locale },
    next: { tags: [`products`] },
  });
  const data: Product[] = await res.json();
  return data;
}

export async function getProduct({ slug }: { slug: string }) {
  const locale = await getLocale();
  const res = await fetch(`${process.env.API_URL}/products/${slug}`, {
      cache: "force-cache",
      headers: { "Accept-Language": locale },
      next: { tags: [`product-${slug}`] },
    }
  );
  if (!res.ok) {
    return notFound();
  }
  const data: ProductDetail = await res.json();
  return data;
}

export async function getAllProducts() {
  const res = await fetch(`${process.env.API_URL}/products`, {
    cache: "force-cache",
    next: { tags: [`products`] },
  });
  const data: ProductFullDetail[] = await res.json();
  return data;
}

export async function getLikedProducts() {
  const cookieStore = await cookies();
  const likedProductsCookie = cookieStore.get("likes")?.value;
  let likedProductsIds: string[] = [];
  if (likedProductsCookie) {
    try {
      likedProductsIds = JSON.parse(likedProductsCookie);
    } catch {
      likedProductsIds = [];
    }
  }
  const products = await getAllProducts();
  const filteredProducts = products.filter((product) =>
    likedProductsIds.some(
      (likedProductsId) => product.id === Number(likedProductsId),
    ),
  );
  return filteredProducts;
}

export async function getCartProducts() {
  const cookieStore = await cookies();
  const cartItemsCookie = cookieStore.get("cartItems")?.value;
  let cartItems: CartItem[] = [];
  if (cartItemsCookie) {
    try {
      cartItems = JSON.parse(cartItemsCookie);
    } catch {
      cartItems = [];
    }
  }

  const products = await getAllProducts();

  const filteredProducts = products.filter((product) =>
    cartItems.some((cartItem) => product.id === Number(cartItem.productId)),
  );
  return filteredProducts;
}
