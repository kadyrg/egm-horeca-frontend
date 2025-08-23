"use client"

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

function CartItemPrice({productId, price}:{productId: number, price: number}) {
  const quantity = useSelector((state: RootState) =>
    state.cartItemState.state.find((item) => item.productId === productId)?.quantity
  );

  if (!quantity) return null;
  return (
    <>
      {price * quantity} lei
    </>
  )
}

export { CartItemPrice }
