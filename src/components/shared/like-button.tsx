"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  addUserProductLike,
  deleteUserProductLike,
} from "@/app/actions/user-product-likes";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserProductLikeState,
  deleteUserProductLikeState,
} from "@/store/user-product-likes-slice";
import { RootState } from "@/store/store";

function LikeButton({
  className,
  productId,
}: {
  className?: string;
  productId: number;
}) {
  const dispatch = useDispatch();
  const userProductLikes = useSelector(
    (state: RootState) => state.userProductLikesState.productIds,
  );
  const isActive = userProductLikes.includes(productId);

  async function handleClick() {
    if (!isActive) {
      dispatch(addUserProductLikeState(productId));
      await addUserProductLike(productId);
    } else {
      dispatch(deleteUserProductLikeState(productId));
      await deleteUserProductLike(productId);
    }
  }
  return (
    <Button
      onClick={() => handleClick()}
      size={"icon"}
      className={cn(
        "hover:bg-red-50 border-red-600 text-red-600  hover:text-red-600",
        isActive && "*:fill-red-400 *:stroke-red-700",
        className,
      )}
      variant={"outline"}
    >
      <Heart />
    </Button>
  );
}

export { LikeButton };
