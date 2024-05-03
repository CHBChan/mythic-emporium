import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType, productsListType } from "../interface/interface";

export interface initialCart {
  productsInCart: productsListType;
}

const initialState: initialCart = {
  productsInCart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<productType>) => {
      if (!state.productsInCart[action.payload.product_id!]) {
        state.productsInCart[action.payload.product_id!] = action.payload;
      } else {
        const updatedProduct = state.productsInCart[action.payload.product_id!];
        updatedProduct.product_quantity += action.payload.product_quantity;

        state.productsInCart[action.payload.product_id!] = updatedProduct;
      }
    },
    updateProductInCart: (state, action: PayloadAction<any>) => {
      const updatedCart = state.productsInCart;
      updatedCart[action.payload.product_id].product_quantity =
        action.payload.product_quantity;
      state.productsInCart = updatedCart;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updatedCart = state.productsInCart;
      delete updatedCart[action.payload];

      state.productsInCart = updatedCart;
    },
  },
});

export const { addProductToCart, updateProductInCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
