"use server"

import { revalidateTag } from "next/cache";

export async function addProductVariant(body: string) {
  console.log(body);
  try {
    const response = await fetch(
      `${process.env.ADMIN_API_URL}/product_variants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("product-variants");
  } catch (error) {
    throw error;
  }
}