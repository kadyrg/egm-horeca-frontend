"use client";

import { addProductToCart } from "@/app/actions/cart-items";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/store/cart-items-slice";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";

function AddToCartButton({
  productId,
  text,
}: {
  productId: number;
  text: string;
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItemState.state);
  const isActive = cartItems.some((item) => item.productId === productId);
  async function handleClick() {
    dispatch(addCartItem({productId: productId, quantity: 1}));
    await addProductToCart(productId);
  }

  return (
    <Button className={cn('w-full', isActive && 'pointer-events-none')} onClick={handleClick}>
      <ShoppingCart className={cn(isActive && 'fill-background')} />{!isActive ? text : "Added"}
    </Button>
  );
}

export { AddToCartButton };
