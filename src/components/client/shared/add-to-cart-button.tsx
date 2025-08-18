"use client";

import { addProductToCart } from "@/app/actions/cart-items";
import { Button } from "../ui/button";
import { startTransition } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCartItemCount } from "@/store/cart-item-count-slice";

function AddToCartButton({
  productId,
  text,
}: {
  productId: number;
  text: string;
}) {
  const dispatch = useDispatch();

  async function handleAddToCart() {
    dispatch(addCartItemCount())
    startTransition(async () => {
      await addProductToCart(productId);
      toast(
        <div className="flex items-center gap-3 text-green-700">
          <Check />
          Product successfully added to your cart
        </div>,
        { position: "top-center" }
      );
    });
  }

  return (
    <Button className="w-full" onClick={handleAddToCart}>
      {text}
    </Button>
  );
}

export { AddToCartButton };
