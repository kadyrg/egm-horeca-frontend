"use client"

import { getCartItems } from "@/app/actions/cart-items";
import { setCartItemCount } from "@/store/cart-item-count-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CartItemsInitializer() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function handleCartItems() {
      const cartItems = await getCartItems();
      const count = cartItems.length;
      dispatch(setCartItemCount(count));

    }
    handleCartItems();
  }, [ dispatch ])
  return null;
};

export { CartItemsInitializer };
