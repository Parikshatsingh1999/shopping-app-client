import { configureStore } from "@reduxjs/toolkit";

import { loginReducer } from "./login/loginSlice";
import { cartReducer } from "./cart/cartSlice";


export const store = configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer
    }
})
