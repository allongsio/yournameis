import { configureStore } from "@reduxjs/toolkit";
import signupinput from "../../modules/modules";

const store = configureStore({
  reducer: { signupinput },
});

export default store;
