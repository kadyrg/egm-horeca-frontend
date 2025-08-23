"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemStore, setCartItemQuantityStore } from "@/store/cart-items-slice";
import { deleteCartItem, setCartItemQuantity } from "@/app/actions/cart-items";
import { Input } from "../ui/input";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";

function CartItemQuantityControls({ productId }: { productId: number }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItemState.state);
  const cartItem = cartItems.find((item) => item.productId === productId);
  const [localQty, setLocalQty] = useState(cartItem?.quantity ?? 0);

  useEffect(() => {
    if (cartItem) setLocalQty(cartItem.quantity);
  }, [cartItem?.quantity]);

  useEffect(() => {
    if (!cartItem) return;
    const handler = setTimeout(() => {
      dispatch(setCartItemQuantityStore({ productId, quantity: localQty }));
      setCartItemQuantity(productId, localQty);
    }, 500);

    return () => clearTimeout(handler);
  }, [localQty]);

  const changeQuantity = async (newQty: number) => {
    if (newQty === 0) {
      await deleteCartItem(productId)
      dispatch(deleteCartItemStore(productId))
      return;
    }
    if (newQty < 0) return;
    setLocalQty(newQty);
  };

  if (!cartItem) return null;

  return (
    <div className="flex items-center gap-1">
      <Button onClick={() => changeQuantity(localQty - 1)} size="icon" className="w-8 h-8" variant="outline">
        <Minus />
      </Button>
      <Input
        value={localQty}
        onChange={(e) => changeQuantity(Number(e.target.value))}
        className="w-10 px-1 text-center h-9 rounded-lg"
      />
      <Button onClick={() => changeQuantity(localQty + 1)} size="icon" className="w-7 h-7" variant="outline">
        <Plus />
      </Button>
    </div>
  );
}

export { CartItemQuantityControls };
