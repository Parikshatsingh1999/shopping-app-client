import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRequest } from "../../services/FetchBuidler";
import { alertMessage } from "../../helpers/alerts";

const initialState = {
    isLoggedIn: sessionStorage.getItem("userLogged") === "true" || false,
    token: createRequest.token,
    isLoading: false
}

export const userLogin = createAsyncThunk("userLogin", async ({ email, password }) => {
    if (!email || !password) {
        return null;
    }
    try {
        const data = await createRequest.fetch("login", { method: 'POST', payload: { email, password } });
        if (data?.accessToken) {
            alertMessage("Logged In successfully");
            return data;
        } else if (data?.error) {
            alertMessage(data?.error);
            return data;
        }
    } catch (error) {
        console.error("error while loggin in", error?.message);
        return error?.message || "Something went wrong";
    }
})

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.token = "";
            createRequest.setToken("");
            sessionStorage.setItem("userLogged", false)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.token = "";
            createRequest.setToken(state.token);
            sessionStorage.setItem("userLogged", false)
        });

        builder.addCase(userLogin.fulfilled, (state, action) => {
            if (action.payload?.accessToken) {
                state.isLoggedIn = true;
                state.token = action.payload?.accessToken;
                createRequest.setToken(state.token);
                sessionStorage.setItem("userLogged", true)
            } else {
                state.isLoggedIn = false;
                createRequest.setToken("");
                sessionStorage.setItem("userLogged", false)
            }
            state.isLoading = false;
        })
    }
})

export const { logOut } = LoginSlice.actions;

export const loginReducer = LoginSlice.reducer;