"use client"

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { deleteCartItem } from "@/app/actions/cart-items"
import { deleteCartItemStore } from "@/store/cart-items-slice"

function CartItemDeleteButton({productId}:{productId: number}) {
  const dispatch = useDispatch()

  async function handleDelete() {
    await deleteCartItem(productId)
    dispatch(deleteCartItemStore(productId))
  }
  return (
    <Button onClick={() => handleDelete()} size={"icon"} variant={"destructive"}><Trash2 /></Button>
  )
}

export { CartItemDeleteButton }
