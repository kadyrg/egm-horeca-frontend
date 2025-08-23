"use client";

import { getCartItems } from "@/app/actions/cart-items";
import { CartItem, setCartItems } from "@/store/cart-items-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CartItemsInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleCartItems() {
      const cartItems = await getCartItems();
      const data: CartItem[] = cartItems.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      }));
      dispatch(setCartItems(data));
    }
    handleCartItems();
  }, [dispatch]);
  return null;
}

export { CartItemsInitializer };
