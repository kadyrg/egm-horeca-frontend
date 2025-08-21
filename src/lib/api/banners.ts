import { Banner } from "../types/banner";

export async function getBanners() {
  const res = await fetch(`${process.env.API_URL}/banners`, {
    cache: "force-cache",
    next: { tags: ["banners"] },
  });
  const data: Banner[] = await res.json();
  return data;
}
