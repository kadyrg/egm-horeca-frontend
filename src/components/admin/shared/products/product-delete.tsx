"use client"

import { deleteProduct } from "@/app/actions/products";
import { Delete } from "../delete";

function ProductDelete({ id } : { id: number }) {
  return (
    <Delete
      onDelete={() => deleteProduct(id)}
      successMessage={"Product deleted successfully"}
      failMessage={"Product couldn't be deleted"}
    />
  )
}

export { ProductDelete };
