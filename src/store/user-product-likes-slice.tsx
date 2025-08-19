import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserProductLikesSlice = {
  productIds: number[];
};

const initialState: UserProductLikesSlice = {
  productIds: [],
};

export const userProductLikesSlice = createSlice({
  name: "userProductLikes",
  initialState,
  reducers: {
    setUserProductLikesState(state, action: PayloadAction<number[]>) {
      state.productIds = action.payload;
    },
    addUserProductLikeState(state, action: PayloadAction<number>) {
      state.productIds.push(action.payload);
    },
    deleteUserProductLikeState(state, action: PayloadAction<number>) {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setUserProductLikesState,
  addUserProductLikeState,
  deleteUserProductLikeState,
} = userProductLikesSlice.actions;
export default userProductLikesSlice.reducer;
