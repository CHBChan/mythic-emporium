import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { brandsDirectory, originsDirectory, productsListType, productType } from "../interface/interface";


export interface productsDirectoryType {
  productsList: productsListType;
  brandsList: brandsDirectory;
  originsList: originsDirectory;
}

export interface initialProductsDirectory extends productsDirectoryType {
  loading: boolean;
}

const initialState: initialProductsDirectory = {
  productsList: {},
  brandsList: {},
  originsList: {},
  loading: true,
};

export const productsDirectorySlice = createSlice({
  name: "productsDirectory",
  initialState,
  reducers: {
    setProductsDirectory: (
      state,
      action: PayloadAction<productsDirectoryType>
    ) => {
      state.productsList = action.payload.productsList;
      state.brandsList = action.payload.brandsList;
      state.originsList = action.payload.originsList;

      state.loading = false;
    },
  },
});

export const { setProductsDirectory } = productsDirectorySlice.actions;
export default productsDirectorySlice.reducer;
