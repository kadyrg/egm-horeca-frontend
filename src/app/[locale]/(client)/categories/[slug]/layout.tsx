import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { AppPagination } from "@/components/shared/pagination";
import { PageProvider } from "@/components/shared/page-provider";
import { getCategoryDetail } from "@/lib/api/categories";
import { CategoryImage } from "@/components/shared/category-image";

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
        <CategoryImage image={data.image} name={data.name} />
      </Section>
      <Section className="!py-0">{children}</Section>
      <Section>
        <AppPagination total={data.totalPages} />
      </Section>
    </PageProvider>
  );
}
