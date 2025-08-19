import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.message || "Verification failed" },
        { status: res.status },
      );
    }
    const data = await res.json();

    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;

    const response = NextResponse.json({ status: "success" });

    if (accessToken) {
      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15, // 15 mins
      });
    }

    if (refreshToken) {
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
