import { getLocale } from "next-intl/server";
import {
  HomePage,
  LoginPage,
  ProductPage,
  RegisterPage,
  RootLayout,
  SharedMetadata,
} from "../types/metadata";

async function getMetadata({ path }: { path: string }) {
  const locale = await getLocale();
  const isDev = process.env.NODE_ENV === "development";

  const res = await fetch(
    `${process.env.API_URL}/metadata/${path}`,
    {
      headers: { "Accept-Language": locale },
      cache: isDev ? "no-cache" : "force-cache",
    },
  );
  const data = await res.json();
  return data;
}

export async function getRootLayoutMetadata() {
  const data: RootLayout = await getMetadata({ path: "root_layout" });
  return data;
}

export async function getHomePageMetadata() {
  const data: HomePage = await getMetadata({ path: "home_page" });
  return data;
}

export async function getProductPageMetadata() {
  const data: ProductPage = await getMetadata({ path: "product_page" });
  return data;
}

export async function getRegisterPageMetadata() {
  const data: RegisterPage = await getMetadata({ path: "register_page" });
  return data;
}

export async function getLoginPageMetadata() {
  const data: LoginPage = await getMetadata({ path: "login_page" });
  return data;
}

export async function getSharedMetadata() {
  const data: SharedMetadata = await getMetadata({ path: "shared" });
  return data;
}
