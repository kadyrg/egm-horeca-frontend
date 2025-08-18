import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddCategoryWindowState = {
  state: boolean;
};

const initialState: AddCategoryWindowState = {
  state: false
};

const addCategoryWindowSlice = createSlice({
  name: "addCategoryWindow",
  initialState,
  reducers: {
    setAddCategoryWindowState(state, action: PayloadAction<boolean>) {
      state.state = action.payload
    },
  },
});

export const { setAddCategoryWindowState } = addCategoryWindowSlice.actions
export default addCategoryWindowSlice.reducer
