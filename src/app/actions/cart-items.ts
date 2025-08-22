"use server";

import { CartItem } from "@/lib/types/cart-items";
import { cookies } from "next/headers";

export async function addProductToCart(productId: number) {
  const cookieStore = await cookies();
  const cartitemsStore = cookieStore.get("cartItems")?.value;
  let cartItems: CartItem[] = [];

  if (cartitemsStore) {
    try {
      cartItems = JSON.parse(cartitemsStore);
    } catch {
      cartItems = [];
    }
  }
  const idStr = productId.toString();
  if (!cartItems.some(item => item.productId === idStr)) {
    cartItems.push({ productId: idStr, quantity: "1" });
  }

  cookieStore.set("cartItems", JSON.stringify(cartItems), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return cartItems;
}

export async function getCartItems(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  let cartItems: CartItem[] = [];
  const cartItemsInCookie = cookieStore.get("cartItems")?.value;
  if (cartItemsInCookie) {
    try {
      cartItems = JSON.parse(cartItemsInCookie) as CartItem[];
    } catch {
      cartItems = [];
    }
  }
  return cartItems;
}
