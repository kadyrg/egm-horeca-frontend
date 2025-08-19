import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EditCategoryWindowState = {
  id: number;
};

const initialState: EditCategoryWindowState = {
  id: 0,
};

const editCategoryWindowSlice = createSlice({
  name: "editCategoryWindow",
  initialState,
  reducers: {
    setEditCategoryWindowState(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

export const { setEditCategoryWindowState } = editCategoryWindowSlice.actions;
export default editCategoryWindowSlice.reducer;
