import { UnauthorizedEroor } from "@/lib/errors";
import { Token } from "@/lib/types/types";
import { cookies } from "next/headers";

export async function getValidAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    if (!refreshToken) {
      return ''
    }

    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `refreshToken=${refreshToken}`,
      },
    });

    if (!refreshRes.ok) {
      return '';
    }

    const data: Token = await refreshRes.json();
    accessToken = data.accessToken;

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return accessToken;
}
