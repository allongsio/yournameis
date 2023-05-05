import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const Slice = createSlice({
  name:,
  initialState,
  reducers: {
    : (state = initialState, action) => {
      state.token = action.payload;
    },
  },
});


export const {  } = tokenSlice.actions;

export default Slice.reducer;