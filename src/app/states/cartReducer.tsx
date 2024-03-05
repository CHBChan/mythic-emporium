import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../interface/interface";

export interface initialCart {
    productCart: productType[]
}

const initialState: initialCart = {
    productCart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateProductInCart: (state, action: PayloadAction<productType>) => {
            const productIndex = state.productCart.findIndex((product) => { action.payload.product_id === product.product_id});
            
            if(productIndex >= 0) {
                state.productCart[productIndex] = {...state.productCart[productIndex], product_quantity: action.payload.product_quantity}
            }
            else {
                state.productCart.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<productType>) => {
            state.productCart = state.productCart.filter((product) => {action.payload.product_id != product.product_id});
        }
    }
})

export const { updateProductInCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer