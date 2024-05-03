import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { brandsDirectory, categoriesDirectory, originsDirectory, productsListType, productType } from "../interface/interface";


export interface productsDirectoryType {
  productsList: productsListType;
  categoriesList: categoriesDirectory;
  brandsList: brandsDirectory;
  originsList: originsDirectory;
  displayProductsList: productsListType;
}

export interface initialProductsDirectory extends productsDirectoryType {
  loading: boolean;
}

const initialState: initialProductsDirectory = {
  productsList: {},
  categoriesList: {},
  brandsList: {},
  originsList: {},
  displayProductsList: {},
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
      state.categoriesList = action.payload.categoriesList;
      state.brandsList = action.payload.brandsList;
      state.originsList = action.payload.originsList;
      state.displayProductsList = action.payload.productsList;

      state.loading = false;
    },
    addProductToDirectory: (
      state,
      action: PayloadAction<productType>
    ) => {
      console.log('payload: ');
      console.log(action.payload);

      console.log('=============================================');
      console.log('product list in state reduxer: ');
      console.log( state.productsList );
      console.log('=============================================');
      const updatedProductsList = { ...state.productsList };
      const updatedDisplayProductsList = { ...state.displayProductsList };

      const newProduct = action.payload;
      const productId = newProduct.product_id;

      updatedProductsList[productId!] = newProduct;
      updatedDisplayProductsList[productId!] = newProduct;

      console.log('reached!');
      const brand = newProduct.product_brand;
      if (!state.brandsList[brand]) {
        state.brandsList[brand] = [];
      }
      state.brandsList[brand].push(newProduct);
      console.log('reached!');

      const category = newProduct.product_category;
      if (!state.categoriesList[category]) {
        state.categoriesList[category] = [];
      }
      state.categoriesList[category].push(newProduct);
      console.log('reached!');

      const origin = newProduct.product_origin;
      if (!state.originsList[origin]) {
        state.originsList[origin] = [];
      }
      state.originsList[origin].push(newProduct);
      console.log('reached!');

    },

    removeProductFromDirectory: (
      state,
      action: PayloadAction<string>
    ) => {
      // state.productsList = Object.values(state.productsList).filter((product) => { return product.product_id !== action.payload });
      const updatedProductsList = { ...state.productsList };
      delete updatedProductsList[action.payload];
      state.productsList = updatedProductsList;

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

      state.productsList[productId!] = updatedProduct;

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
      action: PayloadAction<productsListType>
    ) => {
      state.displayProductsList = action.payload;
    },
    resetDisplayProductsList: (
      state,
    ) => {
      state.displayProductsList = state.productsList;
    },
  },
});

export const { setProductsDirectory, removeProductFromDirectory, updateProductInDirectory, setDisplayProductsList, resetDisplayProductsList, addProductToDirectory } = productsDirectorySlice.actions;
export default productsDirectorySlice.reducer;
