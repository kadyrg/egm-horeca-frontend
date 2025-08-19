"use server";

import { revalidateTag } from "next/cache";

export async function addCategory(formData: FormData) {
  try {
    const response = await fetch(`${process.env.ADMIN_API_URL}/categories`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error();
    }
    revalidateTag("categories");
  } catch (error) {
    throw error;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const response = await fetch(
      `${process.env.ADMIN_API_URL}/categories/${categoryId}`,
      {
        method: "DELETE",
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
