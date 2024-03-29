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
    addProductToDirectory: (
      state,
      action: PayloadAction<productType>
    ) => {

      const newProduct = action.payload;
      const productId = newProduct.product_id;

      state.productsList[productId] = newProduct;
      state.displayProductsList.push(newProduct);

      const brand = newProduct.product_brand;
      if (!state.brandsList[brand]) {
        state.brandsList[brand] = [];
      }
      state.brandsList[brand].push(newProduct);

      const origin = newProduct.product_origin;
      if (!state.originsList[origin]) {
        state.originsList[origin] = [];
      }
      state.originsList[origin].push(newProduct);

    },

    removeProductFromDirectory: (
      state,
      action: PayloadAction<number>
    ) => {
      state.productsList = Object.values(state.productsList).filter((product) => { return product.product_id !== action.payload });

      const updatedBrandsList = { ...state.brandsList };

      Object.keys(updatedBrandsList).forEach((brand) => {
        updatedBrandsList[brand] = updatedBrandsList[brand].filter((product) => {
          return product.product_id != action.payload;
        });
      })

      state.brandsList = updatedBrandsList;

      const updatedOriginsList = { ...state.originsList };

      Object.keys(updatedOriginsList).forEach((origin) => {
        updatedOriginsList[origin] = updatedOriginsList[origin].filter((product) => {
          return product.product_id != action.payload;
        })
      })

      state.originsList = updatedOriginsList;

    },

    updateProductInDirectory: (
      state,
      action: PayloadAction<productType>
    ) => {
      const updatedProduct = action.payload;
      const productId = updatedProduct.product_id;

      state.productsList[productId] = updatedProduct;

      // updating product in the brandsList
      Object.keys(state.brandsList).forEach(brand => {
        state.brandsList[brand] = state.brandsList[brand].map(product => {
          if (product.product_id === productId) {
            return updatedProduct;
          }
          return product;
        });
      });

      // removing product in the originsList
      Object.keys(state.originsList).forEach(origin => {
        state.originsList[origin] = state.originsList[origin].map(product => {
          if (product.product_id === productId) {
            return updatedProduct;
          }
          return product;
        });
      });
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

export const { setProductsDirectory, removeProductFromDirectory, updateProductInDirectory, setDisplayProductsList, resetDisplayProductsList, addProductToDirectory } = productsDirectorySlice.actions;
export default productsDirectorySlice.reducer;
