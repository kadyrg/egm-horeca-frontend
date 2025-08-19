// import { MinMaxPriceState } from "@/components/client/shared/min-max-price-state";
// import { ProductList } from "@/components/client/shared/products-list";
import { Section } from "@/components/client/ui/section";
// import { getAllProducts } from "@/lib/api/products";
// import { Product } from "@/lib/types/types";

// interface Props {
//   params: Promise<{ locale: string }>;
//   searchParams: Promise<{ q: string; sort?: "price_asc" | "price_desc", min: string, max: string }>;
// }

export default async function SearchPage() {
  // const { locale } = await params;
  // const { q, sort , min, max } = await searchParams;

  // const data = await getAllProducts()

  // const filteredData = q
  //   ? data.filter((product) => {
  //       const query = q.toLowerCase();
  //       return (
  //         product.nameEn.toLowerCase().includes(query) ||
  //         product.nameRo.toLowerCase().includes(query)
  //       );
  //     })
  //   : data;

  // const prices = filteredData.map((product) => product.price);
  // const minPrice = Math.floor(Math.min(...prices));
  // const maxPrice = Math.ceil(Math.max(...prices));

  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sort === "price_asc") return a.price - b.price;
  //   if (sort === "price_desc") return b.price - a.price;
  //   return 0;
  // });

  // const minPriceFilter = min ? Number(min) : -Infinity;
  // const maxPriceFilter = max ? Number(max) : Infinity;

  // const filteredByPrice = sortedData.filter(
  //   (product) => product.price >= minPriceFilter && product.price <= maxPriceFilter
  // );

  // const products: Product[] = filteredByPrice.map((product) => ({
  //   id: product.id,
  //   name: locale === "ro" ? product.nameRo : product.nameEn,
  //   description: locale === "ro" ? product.descriptionRo : product.descriptionEn,
  //   mainImage: product.mainImage,
  //   price: product.price,
  //   slug: locale === "ro" ? product.slugRo : product.slugEn,
  // }));

  return (
    <>
      <Section>{/* <ProductList data={products} /> */}</Section>
      {/* <MinMaxPriceState minPrice={minPrice} maxPrice={maxPrice} /> */}
    </>
  );
}
