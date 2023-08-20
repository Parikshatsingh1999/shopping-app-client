import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRequest } from "../../services/FetchBuidler";
import { alertMessage } from "../../helpers/alerts";
import { authLogin } from "../login/loginSlice";

const initialState = {
    items: [],
    price: 0,
    count: 0,
    isUpdating: false
}

export const fetchCart = createAsyncThunk("fetchCart", async (payload, { dispatch }) => {
    const data = await createRequest.fetch("cart");
    if (data.error === "User not authenticated") {
        await dispatch(authLogin())
    }
    return data;
});

export const addItemToCart = createAsyncThunk("addItemToCart", async (payload, { dispatch }) => {
    if (!payload) {
        return null;
    }
    const data = await createRequest.fetch("cart", { method: 'POST', payload })
    if (data.error === "User not authenticated") {
        await dispatch(authLogin({ name: addItemToCart, payload }))
    }
    return data;
});

export const removeItemFromCart = createAsyncThunk("removeItemFromCart", async (payload, { dispatch }) => {
    if (!payload.id) {
        return null;
    }
    const data = await createRequest.fetch("cart/remove", { method: 'POST', payload })
    if (data.error === "User not authenticated") {
        await dispatch(authLogin({ name: removeItemFromCart, payload }))
    }
    return data;
});

export const updateCartItem = createAsyncThunk("updateCartItem", async (payload, { dispatch }) => {
    if (payload.id) {
        const data = await createRequest.fetch("cart/update", { method: 'POST', payload })
        if (data.error === "User not authenticated") {
            await dispatch(authLogin({ name: updateCartItem, payload }))
        }
        return data;
    }
    return null;
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.isUpdating = true;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            if (action.payload?.cartItems) {
                state.items = action.payload.cartItems;
                state.count = action.payload.totalItems;
                state.price = action.payload.totalPrice;
            } else {
                console.error("cart not fetched properly", action.payload);
            }
            state.isUpdating = false;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            alertMessage("error fetching cart", action.payload);
            state.isUpdating = false;
            state.items = [];
            state.price = 0;
            state.count = 0;
        });
        builder.addCase(addItemToCart.pending, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            if (action.payload?.cartItems) {
                state.items = action.payload.cartItems;
                state.count = action.payload.totalItems;
                state.price = action.payload.totalPrice;
            }
            state.isUpdating = false;
        })
        builder.addCase(addItemToCart.rejected, (state, action) => {
            alertMessage("error while adding item to cart", action.payload);
            state.isUpdating = false;
        });
        builder.addCase(removeItemFromCart.pending, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            state.isUpdating = false;
            alertMessage("Error while updating cart", action.payload);
        })
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.isUpdating = false;
            if (action.payload?.cartItems) {
                state.items = action.payload.cartItems
                state.count = action.payload.totalItems;
                state.price = action.payload.totalPrice;
            }
        });

        builder.addCase(updateCartItem.pending, (state) => {
            state.isUpdating = true;
        });

        builder.addCase(updateCartItem.rejected, (state, action) => {
            state.isUpdating = false;
            alertMessage(action.payload);
        });

        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            state.isUpdating = false;
            if (action.payload?.cartItems) {
                state.items = action.payload.cartItems
                state.count = action.payload.totalItems;
                state.price = action.payload.totalPrice;
            }
        })
    }
});

export const cartReducer = cartSlice.reducer;