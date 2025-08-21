import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { AppPagination } from "@/components/shared/pagination";
import { PageProvider } from "@/components/shared/page-provider";
import { getCategoryDetail } from "@/lib/api/categories";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryDetail({ slug: slug });

  return {
    title: data.name,
    description: data.name,
  };
}

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;
  const data = await getCategoryDetail({ slug: slug });

  return (
    <PageProvider total={data.totalPages}>
      <Section className="!pb-0">
        <div className="relative bg-zinc-300 aspect-7/2 md:aspect-5/1 rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap font-bold z-20">
            {data.name}
          </h1>
          <Image
            width={1920}
            height={384}
            src={data.image}
            className="aspect-7/2 md:aspect-5/1 object-cover"
            alt={data.name}
          />
        </div>
      </Section>
      <Section className="!py-0">{children}</Section>
      <Section>
        <AppPagination total={data.totalPages} />
      </Section>
    </PageProvider>
  );
}
