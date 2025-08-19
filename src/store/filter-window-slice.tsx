import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterWindowState = {
  state: boolean;
};

const initialState: FilterWindowState = {
  state: false,
};

const filterWindowSlice = createSlice({
  name: "Window",
  initialState,
  reducers: {
    setFilterWindowState(state, action: PayloadAction<boolean>) {
      state.state = action.payload;
    },
  },
});

export const { setFilterWindowState } = filterWindowSlice.actions;
export default filterWindowSlice.reducer;
