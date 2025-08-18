"use client"

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";

function LikeHeaderButton() {
  const likedProducts = useSelector((state: RootState) => state.userProductLikesState.productIds)
  const likedProductsCount = likedProducts.length
  return (
    <Link
      href='/likes'
      className="relative w-10 h-10 hover:bg-secondary flex items-center justify-center rounded-full"
    >
      <span className={cn(
        'absolute -top-[3px] -right-[3px]  items-center justify-center rounded-full bg-red-700 text-background text-[11px] w-[18px] h-[18px]',
        likedProductsCount ? 'inline-flex' : 'hidden'
      )}>
        {likedProductsCount}
      </span>
    <Heart strokeWidth={1.5} size={18} />
    </Link>
  );
};

export { LikeHeaderButton };
