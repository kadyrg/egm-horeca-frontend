"use client";

import { Link } from "@/i18n/navigation";
import { ShoppingBagIcon } from "../ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { cn } from "@/lib/utils";

function CartButton() {
  const cartItemCount = useSelector(
    (state: RootState) => state.cartItemCountState.state,
  );

  return (
    <Link
      href="/cart"
      className="relative w-10 h-10 hover:bg-secondary flex items-center justify-center rounded-full"
    >
      <span
        className={cn(
          "absolute -top-[3px] -right-[3px]  items-center justify-center rounded-full bg-primary text-background text-[11px] w-[18px] h-[18px]",
          cartItemCount ? "inline-flex" : "hidden",
        )}
      >
        {cartItemCount}
      </span>
      <ShoppingBagIcon />
    </Link>
  );
}

export { CartButton };
