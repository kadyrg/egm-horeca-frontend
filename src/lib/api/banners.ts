import { Banner } from "../types/banner";

export async function getBanners() {
  const isDev = process.env.NODE_ENV === "development";
  const res = await fetch(`${process.env.API_URL}/banners`, {
    cache: isDev ? "no-cache" : "force-cache",
  });
  const data: Banner[] = await res.json();
  return data;
}