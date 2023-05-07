import { createSlice } from "@reduxjs/toolkit";

const initialState = { signupInfo: {} };

const inputSlice = createSlice({
  name: "signupinput",
  initialState,
  reducers: {
    setUserInfo: (state = initialState, action) => {
      state.signupInfo = {
        ...state.signupInfo,
        [action.payload.title]: action.payload.content,
      };
      console.log(state.signupInfo);
    },
  },
});

export default inputSlice.reducer;

export const { setUserInfo } = inputSlice.actions;
