import { CategoryAdd } from "@/components/admin/shared/category-add";
import { CategoriesTable } from "@/components/admin/shared/categories-table";
import { List } from "@/components/admin/shared/list";
import { getCategoriesAdmin } from "@/lib/api/categories";

interface Props {
  searchParams: Promise<{ page: number }>;
}

export default async function CategoriesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const reqPage = page ? Number(page) : 1;
  const data = await getCategoriesAdmin({ page: reqPage });

  return (
    <List
      addFeature={<CategoryAdd />}
      title={"Categories"}
      table={<CategoriesTable data={data.data} />}
      total={data.total}
      initial={data.initial}
      last={data.last}
      totalPages={data.totalPages}
      page={data.page}
      searchPlaceholder={"Search category..."}
    />
  );
};
