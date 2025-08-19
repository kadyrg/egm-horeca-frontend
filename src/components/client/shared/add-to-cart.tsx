import { getSharedMetadata } from "@/lib/api/metadata";
import { AddToCartButton } from "./add-to-cart-button";

async function AddToCart({ productId }: { productId: number }) {
  const metadata = await getSharedMetadata();

  return <AddToCartButton productId={productId} text={metadata.addToCart} />;
}

export { AddToCart };
