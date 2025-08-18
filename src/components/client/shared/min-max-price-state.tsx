"use client"

import { setMinMaxPrice } from "@/store/min-max-price-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function MinMaxPriceState({ minPrice, maxPrice } : { minPrice: number; maxPrice: number }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setMinMaxPrice([minPrice, maxPrice]));
  }, [minPrice, maxPrice, dispatch])
  
  return null;
};

export { MinMaxPriceState };
