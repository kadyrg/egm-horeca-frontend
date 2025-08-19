"use client";

import { getUserProductLikes } from "@/app/actions/user-product-likes";
import { setUserProductLikesState } from "@/store/user-product-likes-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function UserProductLikesInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleCartItems() {
      const likes = await getUserProductLikes();
      const productIds: number[] = likes.map((id) => Number(id));
      dispatch(setUserProductLikesState(productIds));
    }
    handleCartItems();
  }, [dispatch]);
  return null;
}

export { UserProductLikesInitializer };
