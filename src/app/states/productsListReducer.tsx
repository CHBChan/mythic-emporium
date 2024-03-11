import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { brandsDirectory, originsDirectory, productsListType, productType } from "../interface/interface";


export interface productsDirectoryType {
  productsList: productsListType;
  brandsList: brandsDirectory;
  originsList: originsDirectory;
  displayProductsList: productType[];
}

export interface initialProductsDirectory extends productsDirectoryType {
  loading: boolean;
}

const initialState: initialProductsDirectory = {
  productsList: {},
  brandsList: {},
  originsList: {},
  displayProductsList: [],
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
      state.displayProductsList = Object.values(action.payload.productsList);

      state.loading = false;
    },
    setDisplayProductsList: (
      state,
      action: PayloadAction<productType[]>
    ) => {
      state.displayProductsList = action.payload;
    },
    resetDisplayProductsList: (
      state,
    ) => {
      state.displayProductsList = Object.values(state.productsList);
    },
  },
});

export const { setProductsDirectory, setDisplayProductsList, resetDisplayProductsList } = productsDirectorySlice.actions;
export default productsDirectorySlice.reducer;
