import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: sessionStorage.getItem("userLogged") === "true" || false,
    token: "",
}

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.isLoggedIn = action.payload.setLogin || false;
            state.token = action.payload.token || "";
            sessionStorage.setItem("userLogged", state.isLoggedIn)
        }
    }
})

export const { setLogIn } = LoginSlice.actions;

export const loginReducer = LoginSlice.reducer;