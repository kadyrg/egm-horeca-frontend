"use server";

import { CartItem } from "@/lib/types/cart-items";
import { cookies } from "next/headers";

export async function addProductToCart(productId: number) {
  const cookieStore = await cookies();
  const existingCartItems = cookieStore.get("cartItems")?.value;
  let cartItems: CartItem[] = [];

  if (existingCartItems) {
    try {
      cartItems = JSON.parse(existingCartItems);
    } catch {
      cartItems = [];
    }
  }
  const existingCartItem = cartItems.find(
    (item) => item.productId === productId.toString()
  );
  if (existingCartItem) {
    existingCartItem.quantity = (
      Number(existingCartItem.quantity) + 1
    ).toString();
  } else {
    cartItems.push({ productId: productId.toString(), quantity: "1" });
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
