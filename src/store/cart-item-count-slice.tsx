import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemCountState = {
  state: number;
};

const initialState: CartItemCountState = {
  state: 0,
};

const cartItemCountSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItemCount(state, action: PayloadAction<number>) {
      state.state = action.payload;
    },
    addCartItemCount(state) {
      state.state += 1;
    },
  },
});

export const { setCartItemCount, addCartItemCount } =
  cartItemCountSlice.actions;
export default cartItemCountSlice.reducer;
