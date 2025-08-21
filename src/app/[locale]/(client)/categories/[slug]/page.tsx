import { ProductList } from "@/components/shared/products-list";
import { getCategoryProducts } from "@/lib/api/categories";
import { Product } from "@/lib/types/products";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({params, searchParams}: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data: Product[] = await getCategoryProducts({ slug: slug, page: currentPage});
  return <><ProductList data={data} /></>;
}
