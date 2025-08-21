import { ProductCard } from "./product-card";
import { LikedProductCartWrapper } from "./liked-product-cart-wrapper";
import { Product } from "@/lib/types/products";

function LikedProductList({ data }: { data: Product[] }) {
  if (data.length === 0) {
    return <p className="text-center py-6 text-gray-500">No products found.</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 py-3 sm:gap-4 sm:py-4 md:gap-5 md:py-5 lg:py-6 lg:gap-6 xl:py-7 xl:gap-7">
      {data.map((item) => (
        <LikedProductCartWrapper key={item.id} productId={item.id}>
          <ProductCard data={item} />
        </LikedProductCartWrapper>
      ))}
    </div>
  );
}

export { LikedProductList };
