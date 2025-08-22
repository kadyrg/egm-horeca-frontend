import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemsState = {
  productIds: number[]
};

const initialState: CartItemsState = {
  productIds: [],
}

const cartItemsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<number[]>) {
      state.productIds = action.payload;
    },
    addCartItem(state, action: PayloadAction<number>) {
      state.productIds.push(action.payload);
    },
  },
});

export const { setCartItems, addCartItem } =
  cartItemsSlice.actions;
export default cartItemsSlice.reducer;
