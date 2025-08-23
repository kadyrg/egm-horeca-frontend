import { CategoryImage } from "@/components/shared/category-image";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/api/categories";

export default async function CategoriesPage() {
  const data = await getCategories()

  return (
    <Section className="flex flex-col gap-4 md:gap-5">
      {data.map((item) => (
        <Link key={item.id} href={`/categories/${item.slug}`}>
          <CategoryImage image={item.image} name={item.name} />
        </Link>
      ))}
    </Section>
  );
}
