import { ProductVariantTypesListAdmin } from "../types/product-variant-types";

// Admin

export async function getProductVariantTypesAdmin() {
  const res = await fetch(`${process.env.ADMIN_API_URL}/product_variant_types`, {
    method: "GET",
    next: { tags: ["product-variant-types"] },
  });
  const data: ProductVariantTypesListAdmin = await res.json();
  return data;
}
