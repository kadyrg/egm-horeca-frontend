import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  productId: number
  quantity: number
};

type CartItemsState = {
  state: CartItem[]
}

const initialState: CartItemsState = {
  state: []
}

const cartItemsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.state = action.payload;
    },
    addCartItem(state, action: PayloadAction<CartItem>) {
      state.state.push(action.payload);
    },
    setCartItemQuantityStore(state, action: PayloadAction<CartItem>) {
      const item = state.state.find((item) => item.productId===action.payload.productId)
      if (item) {
        if (action.payload.quantity===0) {
          state.state = state.state.filter((item) => item.productId!==action.payload.productId)
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    deleteCartItemStore(state, action: PayloadAction<number>) {
      state.state = state.state.filter((item) => item.productId!==action.payload)
    }
  },
});

export const { setCartItems, addCartItem, setCartItemQuantityStore, deleteCartItemStore } =
  cartItemsSlice.actions;
export default cartItemsSlice.reducer;
