"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function LikedProductCartWrapper({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: number;
}) {
  const likedProductIds = useSelector(
    (state: RootState) => state.userProductLikesState.productIds,
  );
  const isActive = likedProductIds.includes(productId);
  if (isActive) {
    return <>{children}</>;
  }
  return null;
}

export { LikedProductCartWrapper };
