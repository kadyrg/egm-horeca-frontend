import { Metadata } from "next";
import { getProduct } from "@/lib/api/products";
import { getProductPageMetadata } from "@/lib/api/metadata";
import { Product } from "@/lib/types/products";
import { ProductDetail } from "@/components/shared/product";
import { HorizontalFlexProducts } from "@/components/shared/horizontal-flex-products";
import { Section } from "@/components/ui/section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct({ slug: slug });
  return {
    title: data.name,
    description: data.description,
  };
}

export async function generateStaticParams() {
  const fetchProducts = async () => {
    const res = await fetch(`${process.env.API_URL}/products`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  };

  const products = await fetchProducts();

  return [
    ...products.map((p: { slugEn: string }) => ({
      locale: "en",
      productSlug: p.slugEn,
    })),
    ...products.map((p: { slugRo: string }) => ({
      locale: "ro",
      productSlug: p.slugRo,
    })),
  ];
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const metadata = await getProductPageMetadata();

  return (
    <>
      <ProductDetail
        slug={slug}
        description={metadata.description}
        addToCart={metadata.addToCart}
        checkoutNow={metadata.checkoutNow}
      />
      <Section>
        <hr />
      </Section>
      <Related title={metadata.related} />
    </>
  );
}

async function Related({ title }: { title: string }) {
  const isDev = process.env.NODE_ENV === "development";

  const res = await fetch(
    `${process.env.API_URL}/products/top`,
    {
      cache: isDev ? "no-cache" : "force-cache",
    },
  );
  const data: Product[] = await res.json();

  return <HorizontalFlexProducts data={data} title={title} />;
}
