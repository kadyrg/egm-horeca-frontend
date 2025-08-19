"use server";

import { revalidateTag } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    const response = await fetch(`${process.env.ADMIN_API_URL}/products`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("products");
  } catch (error) {
    throw error;
  }
}

export async function editProduct(productId: number, formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.ADMIN_API_URL}/products/${productId}`,
      {
        method: "PATCH",
        body: formData,
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("products");
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId: number) {
  try {
    const response = await fetch(
      `${process.env.ADMIN_API_URL}/products/${productId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("products");
  } catch (error) {
    throw error;
  }
}

export async function updateCategory(categoryId: number, formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.ADMIN_API_URL}/categories/${categoryId}`,
      {
        method: "PATCH",
        body: formData,
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("categories");
  } catch (error) {
    throw error;
  }
}
