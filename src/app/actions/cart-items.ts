"use server";

import { CartItem } from "@/lib/types/metadata";
import { getValidAccessToken } from "./auth";
import { UnauthorizedEroor } from "@/lib/errors";
import { cookies } from "next/headers";

export async function addProductToCart(productId: number) {
  const cookieStore = await cookies();
  let accessToken: string = "";

  try {
    accessToken = await getValidAccessToken();
  } catch {
    accessToken = "";
  }

  let cartItem: CartItem | null = null;

  if (accessToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart_items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
          },
          body: JSON.stringify({ productId: productId }),
        },
      );
      if (res.status === 401) {
        throw new UnauthorizedEroor();
      } else if (!res.ok) {
        throw new Error("Failed to add to cart");
      }
      const data: CartItem = await res.json();
      cartItem = data;
    } catch {
      cartItem = null;
    }
  }
  const existingCartItems = cookieStore.get("cartItems")?.value;
  let cartItems: CartItem[] = [];
  if (existingCartItems) {
    try {
      cartItems = JSON.parse(existingCartItems);
    } catch {
      cartItems = [];
    }
    if (cartItem) {
      const existingCartItem = cartItems.find(
        (item) => item.productId === cartItem.productId,
      );
      if (existingCartItem) {
        existingCartItem.quantity = cartItem.quantity;
      } else {
        cartItems.push(cartItem);
      }
    } else {
      const existingCartItem = cartItems.find(
        (item) => item.productId === productId.toString(),
      );
      if (existingCartItem) {
        existingCartItem.quantity = (
          Number(existingCartItem.quantity) + 1
        ).toString();
      } else {
        cartItems.push({ productId: productId.toString(), quantity: "1" });
      }
    }
  }
  cookieStore.set("cartItems", JSON.stringify(cartItems), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return cartItem;
}

export async function getCartItems() {
  const cookieStore = await cookies();
  const accessToken = await getValidAccessToken();

  if (accessToken) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart_items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );
    if (res.status === 401) {
      throw new UnauthorizedEroor();
    } else if (!res.ok) {
      throw new Error("Failed to add to cart");
    }
    const data: CartItem[] = await res.json();
    cookieStore.set("cartItems", JSON.stringify(data), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 1 month
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return data;
  } else {
    return [];
  }
}
