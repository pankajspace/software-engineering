import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice";
import pizzaSlice from "../features/pizza/pizzaSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    pizza: pizzaSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
