"use server";

import { UserProductLike } from "@/lib/types/user-product-likes";
import { getValidAccessToken } from "./auth";
import { cookies } from "next/headers";

export async function getUserProductLikes() {
  const accessToken = await getValidAccessToken();
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;

  let userProductLikes: string[] = [];

  let likesInStore: string[] = [];
  if (likesStore) {
    try {
      likesInStore = JSON.parse(likesStore);
    } catch {
      likesInStore = [];
    }
  }
  if (accessToken) {
    const res = await fetch(
      `${process.env.API_URL}/user_product_likes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );
    if (res.ok) {
      const data: UserProductLike[] = await res.json();
      const likesInBackend: string[] = data.map((data) =>
        data.productId.toString(),
      );
      userProductLikes.push(...likesInBackend);
      const likesNotInBackend = likesInStore.filter(
        (like) => !likesInBackend.includes(like),
      );
      if (likesNotInBackend.length !== 0) {
        const res = await fetch(
          `${process.env.API_URL}/user_product_likes/add_bulk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify({ productIds: likesNotInBackend }),
          },
        );
        if (res.ok) {
          const data: UserProductLike[] = await res.json();
          const addedLikes: string[] = data.map((data) =>
            data.productId.toString(),
          );
          userProductLikes.push(...addedLikes);
        }
      }
    }
  } else {
    userProductLikes = likesInStore;
  }

  cookieStore.set("likes", JSON.stringify(userProductLikes), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return userProductLikes;
}

export async function addUserProductLike(productId: number) {
  const accessToken = await getValidAccessToken();
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;

  let likesInCookie: string[] = [];

  if (likesStore) {
    try {
      const parsed = JSON.parse(likesStore);
      if (Array.isArray(parsed)) {
        likesInCookie = parsed;
      } else {
        likesInCookie = [];
      }
    } catch {
      likesInCookie = [];
    }
  }

  if (accessToken) {
    try {
      await fetch(`${process.env.API_URL}/user_product_likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ productId: productId }),
      });
    } catch {}
  }
  const idStr = productId.toString();
  likesInCookie.push(idStr);

  cookieStore.set("likes", JSON.stringify(likesInCookie), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function deleteUserProductLike(productId: number) {
  const accessToken = await getValidAccessToken();
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;

  let likesInCookie: string[] = [];

  if (likesStore) {
    try {
      const parsed = JSON.parse(likesStore);
      if (Array.isArray(parsed)) {
        likesInCookie = parsed;
      } else {
        likesInCookie = [];
      }
    } catch {
      likesInCookie = [];
    }
  }

  if (accessToken) {
    try {
      await fetch(`${process.env.API_URL}/user_product_likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ productId: productId }),
      });
    } catch {}

    const idStr = productId.toString();
    likesInCookie = likesInCookie.filter((id) => id !== idStr);

    cookieStore.set("likes", JSON.stringify(likesInCookie), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }
}
