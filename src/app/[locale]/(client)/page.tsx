import { Hero } from "@/components/shared/hero";
import { HorizontalFlexProducts } from "@/components/shared/horizontal-flex-products";
import { getHomePageMetadata } from "@/lib/api/metadata";
import { getNewProducts, getTopProducts } from "@/lib/api/products";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getHomePageMetadata();

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function HomePage() {
  const metadata = await getHomePageMetadata();

  return (
    <>
      <Hero />
      <Tops title={metadata.tops} />
      <News title={metadata.news} />
    </>
  );
}

async function Tops({ title }: { title: string }) {
  const data = await getTopProducts();

  return <HorizontalFlexProducts data={data} title={title} />;
}

async function News({ title }: { title: string }) {
  const data = await getNewProducts();

  return <HorizontalFlexProducts data={data} title={title} />;
}
