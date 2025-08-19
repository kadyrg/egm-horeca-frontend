import { ProductVariantsListAdmin } from "../types/product-variants";

export async function getProductVariantsByProductId(productId: number) {
  const res = await fetch(`${process.env.ADMIN_API_URL}/products/${productId}/variants`, {
    method: "GET",
    next: { tags: ["product-variants"] },
  });
  const data: ProductVariantsListAdmin = await res.json();
  return data;
}
