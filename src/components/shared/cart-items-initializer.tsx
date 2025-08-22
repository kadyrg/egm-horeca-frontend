"use client";

import { getCartItems } from "@/app/actions/cart-items";
import { setCartItems } from "@/store/cart-items-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CartItemsInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleCartItems() {
      const cartItems = await getCartItems();
      const productIds: number[] = cartItems.map((item) => Number(item.productId));
      dispatch(setCartItems(productIds));
    }
    handleCartItems();
  }, [dispatch]);
  return null;
}

export { CartItemsInitializer };
