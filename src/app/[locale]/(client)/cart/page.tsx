import { CartItemsList } from "@/components/shared/cart-items-list";
import { Section } from "@/components/ui/section";
import { getCartProducts } from "@/lib/api/products";
import { Product } from "@/lib/types/products";
import { getLocale } from "next-intl/server";

export default async function CartPage() {
  const locale = await getLocale()
  const cartProducts = await getCartProducts();

  const products: Product[] = cartProducts.map((product) => ({
    id: product.id,
    name: locale === "ro" ? product.nameRo : product.nameEn,
    description: locale === "ro" ? product.descriptionRo : product.descriptionEn,
    mainImage: product.mainImage,
    price: product.price,
    slug: locale === "ro" ? product.slugRo : product.slugEn,
  }));

  return (
    <>
      <Section>
        <h1 className="text-xl font-bold">My Cart</h1>
      </Section>
      <Section><CartItemsList data={products} /></Section>
    </>
  );
}
