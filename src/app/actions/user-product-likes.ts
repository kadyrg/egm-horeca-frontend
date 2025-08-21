"use server";

import { cookies } from "next/headers";

export async function getUserProductLikes() {
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;
  let likes: string[] = [];
  if (likesStore) {
    try {
      likes = JSON.parse(likesStore);
    } catch {
      likes = [];
    }
  }
  return likes;
}

export async function addUserProductLike(productId: number) {
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;

  let likes: string[] = [];

  if (likesStore) {
    try {
      const parsed = JSON.parse(likesStore);
      if (Array.isArray(parsed)) {
        likes = parsed;
      }
    } catch {
      likes = [];
    }
  }

  const idStr = productId.toString();

  // Avoid duplicates
  if (!likes.includes(idStr)) {
    likes.push(idStr);
  }

  cookieStore.set("likes", JSON.stringify(likes), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30 * 12, // 1 month
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return likes;
}

export async function deleteUserProductLike(productId: number): Promise<string[]> {
  const cookieStore = await cookies();
  const likesStore = cookieStore.get("likes")?.value;

  let likes: string[] = [];

  if (likesStore) {
    try {
      const parsed = JSON.parse(likesStore);
      if (Array.isArray(parsed)) likes = parsed;
    } catch {}
  }

  const idStr = productId.toString();
  likes = likes.filter((id) => id !== idStr);

  cookieStore.set("likes", JSON.stringify(likes), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return likes;
}
