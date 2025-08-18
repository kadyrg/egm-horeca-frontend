import { ProductList } from "@/components/client/shared/products-list";
import { Section } from "@/components/client/ui/section";
import { getCartProducts } from "@/lib/api/products";
import { Product } from "@/lib/types/types";
import { getLocale } from "next-intl/server";

export default async function CartPage() {
  const locale = await getLocale()
  const cartProducts = await getCartProducts();

  const products: Product[] = cartProducts.map((product) => ({
    id: product.id,
    name: locale === "ro" ? product.nameRo : product.nameEn,
    description: locale === "ro" ? product.descriptionRo : product.descriptionEn,
    image: product.image,
    price: product.price,
    slug: locale === "ro" ? product.slugRo : product.slugEn,
  }));

  return (
    <>
      <Section>
        <h1 className="text-xl font-bold">My Cart</h1>
      </Section>
      <Section>
        <ProductList data={products} />
      </Section>
    </>
  );
};
