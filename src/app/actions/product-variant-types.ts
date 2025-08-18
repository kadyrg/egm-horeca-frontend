"use server"

import { revalidateTag } from "next/cache";

export async function addProductVariantType(body: string) {
  console.log(body)
  try {
    const response = await fetch(`${process.env.ADMIN_API_URL}/product_variant_types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("product-variant-types");
  } catch (error) {
    throw error;
  }
};

export async function editProductVariantType(productVariantTypeId: number, body: string) {
  try {
    const response = await fetch(`${process.env.ADMIN_API_URL}/product_variant_types/${productVariantTypeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("product-variant-types");
  } catch (error) {
    throw error;
  }
};

export async function deleteProductVariantType(productVariantTypeId: number) {
  try {
    const response = await fetch(`${process.env.ADMIN_API_URL}/product_variant_types/${productVariantTypeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("product-variant-types");
  } catch (error) {
    throw error;
  }
};


