import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MinMaxPriceState = {
  minmax: [number, number];
};

const initialState: MinMaxPriceState = {
  minmax: [0, 0],
};

const minMaxPriceSlice = createSlice({
  name: "minMaxPrice",
  initialState,
  reducers: {
    setMinMaxPrice(state, action: PayloadAction<[number, number]>) {
      state.minmax = action.payload;
    },
  },
});

export const { setMinMaxPrice } = minMaxPriceSlice.actions;
export default minMaxPriceSlice.reducer;
