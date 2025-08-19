import { configureStore } from "@reduxjs/toolkit";
import minMaxPriceReducer from "./min-max-price-slice";
import filterWindowReducer from "./filter-window-slice";
import cartItemCountReducer from "./cart-item-count-slice";
import userProductLikesReducer from "./user-product-likes-slice";

export const store = configureStore({
  reducer: {
    minMaxPrice: minMaxPriceReducer,
    filterWindowSlice: filterWindowReducer,
    cartItemCountState: cartItemCountReducer,
    userProductLikesState: userProductLikesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
