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
        addProductToCart: (state, action: PayloadAction<productType>) => {
            const productIndex = state.productCart.findIndex((product) => action.payload.product_id! === product.product_id!);
            if(productIndex >= 0) {
                const existingProductQuantity = state.productCart[productIndex].product_quantity;
                state.productCart[productIndex] = {...state.productCart[productIndex], product_quantity: existingProductQuantity + action.payload.product_quantity};
            }
            else {
                state.productCart.push(action.payload);
            }
        },
        updateProductInCart: (state, action: PayloadAction<any>) => {
            const productIndex = state.productCart.findIndex((product) => action.payload.product_id! === product.product_id!);
            state.productCart[productIndex] = {...state.productCart[productIndex], product_quantity: action.payload.product_quantity};
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.productCart = state.productCart.filter((product) => action.payload != product.product_id);
        }
    }
})

export const { addProductToCart, updateProductInCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer