"use client";

import { deleteProductVariantType } from "@/app/actions/product-variant-types";
import { Delete } from "./delete";

function ProductVariantTypeDelete({ id }: { id: number }) {
  return (
    <Delete
      onDelete={() => deleteProductVariantType(id)}
      successMessage={"Product deleted successfully"}
      failMessage={"Product couldn't be deleted"}
    />
  );
}

export { ProductVariantTypeDelete };
