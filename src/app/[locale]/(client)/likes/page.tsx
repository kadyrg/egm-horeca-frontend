// import { LikedProductList } from "@/components/client/shared/liked-product-list";
import { Section } from "@/components/client/ui/section";
// import { getLikedProducts } from "@/lib/api/products";
// import { Product } from "@/lib/types/types";
// import { getLocale } from "next-intl/server";

export default async function LikesPage() {
  // const locale = await getLocale()
  // const likedProducts = await getLikedProducts()
  // const products: Product[] = likedProducts.map((product) => ({
  //     id: product.id,
  //     name: locale === "ro" ? product.nameRo : product.nameEn,
  //     description: locale === "ro" ? product.descriptionRo : product.descriptionEn,
  //     image: product.image,
  //     price: product.price,
  //     slug: locale === "ro" ? product.slugRo : product.slugEn,
  //   }));

  return (
    <>
      <Section>
        <h1 className="text-xl font-bold">My Favourites</h1>
      </Section>
      <Section>{/* <LikedProductList data={products} /> */}</Section>
    </>
  );
}
