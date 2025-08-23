import { Product } from "@/lib/types/products";
import { CartItem } from "./cart-item";

function CartItemsList({ data }: { data: Product[] }) {
  if (data.length === 0) {
    return <p className="text-center py-6 text-gray-500">No products found.</p>;
  }
  return (
    <div className="space-y-3 py-3 sm:space-y-4 sm:py-4 md:space-y-5 md:py-5 lg:py-6 lg:space-y-6 xl:py-7 xl:space-y-7">
      {data.map((item) => (
        <CartItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export { CartItemsList };
