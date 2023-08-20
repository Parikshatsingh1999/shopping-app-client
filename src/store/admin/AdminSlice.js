import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const adminSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateAdmin: (state, action) => {
            if (action.payload?.user) {
                state.user = action.payload.user
            }
        }
    },
})

export const { updateAdmin } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;