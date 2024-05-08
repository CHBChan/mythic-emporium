import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  brandsDirectory,
  categoriesDirectory,
  originsDirectory,
  productsListType,
  productType,
} from "../interface/interface";

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
    addProductToDirectory: (state, action: PayloadAction<productType>) => {
      console.log("payload: ");
      console.log(action.payload);

      console.log("=============================================");
      console.log("product list in state reduxer: ");
      console.log(state.productsList);
      console.log("=============================================");
      const updatedProductsList = { ...state.productsList };
      const updatedDisplayProductsList = { ...state.displayProductsList };

      const newProduct = action.payload;
      const productId = newProduct.product_id;

      updatedProductsList[productId!] = newProduct;
      updatedDisplayProductsList[productId!] = newProduct;

      const brand = newProduct.product_brand;
      if (!state.brandsList[brand]) {
        state.brandsList[brand] = [];
      }
      state.brandsList[brand].push(newProduct);

      const category = newProduct.product_category;
      if (!state.categoriesList[category]) {
        state.categoriesList[category] = [];
      }
      state.categoriesList[category].push(newProduct);

      const origin = newProduct.product_origin;
      if (!state.originsList[origin]) {
        state.originsList[origin] = [];
      }
      state.originsList[origin].push(newProduct);

      state.productsList = updatedProductsList;
      state.displayProductsList = updatedDisplayProductsList;
    },

    removeProductFromDirectory: (state, action: PayloadAction<string>) => {
      // state.productsList = Object.values(state.productsList).filter((product) => { return product.product_id !== action.payload });
      const updatedProductsList = { ...state.productsList };
      delete updatedProductsList[action.payload];
      state.productsList = updatedProductsList;

      const updatedDisplayProductsList = { ...state.displayProductsList };
      delete updatedDisplayProductsList[action.payload];
      state.displayProductsList = updatedDisplayProductsList;

      const updatedBrandsList = { ...state.brandsList };

      Object.keys(updatedBrandsList).forEach((brand) => {
        updatedBrandsList[brand] = updatedBrandsList[brand].filter(
          (product) => {
            return product.product_id != action.payload;
          }
        );
      });

      state.brandsList = updatedBrandsList;

      const updatedOriginsList = { ...state.originsList };

      Object.keys(updatedOriginsList).forEach((origin) => {
        updatedOriginsList[origin] = updatedOriginsList[origin].filter(
          (product) => {
            return product.product_id != action.payload;
          }
        );
      });

      state.originsList = updatedOriginsList;

      const updatedCategoriesList = { ...state.categoriesList };

      Object.keys(updatedCategoriesList).forEach((category) => {
        updatedCategoriesList[category] = updatedCategoriesList[
          category
        ].filter((product) => {
          return product.product_id != action.payload;
        });
      });

      state.categoriesList = updatedCategoriesList;
    },

    updateProductInDirectory: (state, action: PayloadAction<productType>) => {
      console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR~");

      const updatedProduct = action.payload;
      const productId = updatedProduct.product_id;

      // state.productsList[productId!] = updatedProduct;

      const updatedProductsList = { ...state.productsList };
      updatedProductsList[productId!] = updatedProduct;
      state.productsList = updatedProductsList;

      //checks to see if product is in the displayProductList before updating it (to not accidentally add it in)
      if (state.displayProductsList[productId!]) {
        state.displayProductsList[productId!] = updatedProduct;
      }

      //TODO: make below more efficient by removing reduntant searches

      //removing product from brandsList
      const updatedBrandsList = { ...state.brandsList };
      Object.keys(updatedBrandsList).forEach((brand) => {
        updatedBrandsList[brand] = updatedBrandsList[brand].filter(
          (product) => {
            return product.product_id != updatedProduct.product_id;
          }
        );
      });
      // updating product into the brandsList
      if (updatedBrandsList[updatedProduct.product_brand]) {
        updatedBrandsList[updatedProduct.product_brand].push(updatedProduct);
      } else {
        updatedBrandsList[updatedProduct.product_brand] = [updatedProduct];
      }
      //updating the brand state with the updated list
      state.brandsList = updatedBrandsList;

      //removing product from originsList
      const updatedOriginsList = { ...state.originsList };
      Object.keys(updatedOriginsList).forEach((origin) => {
        updatedOriginsList[origin] = updatedOriginsList[origin].filter(
          (product) => {
            return product.product_id != updatedProduct.product_id;
          }
        );
      });
      // updating product into the brandsList
      if (updatedOriginsList[updatedProduct.product_origin]) {
        updatedOriginsList[updatedProduct.product_origin].push(updatedProduct);
      } else {
        updatedOriginsList[updatedProduct.product_origin] = [updatedProduct];
      }
      //updating the origin state with the updated list
      state.originsList = updatedOriginsList;


      //removing product from categoriesList
      const updatedCategoriesList = { ...state.categoriesList };
      Object.keys(updatedCategoriesList).forEach((category) => {
        updatedCategoriesList[category] = updatedCategoriesList[category].filter(
          (product) => {
          return product.product_id != updatedProduct.product_id;
        });
      });
      // updating product into the categories list
      if (updatedCategoriesList[updatedProduct.product_category]) {
        updatedCategoriesList[updatedProduct.product_category].push(updatedProduct);
      } else {
        updatedCategoriesList[updatedProduct.product_category] = [updatedProduct];
      }
      //updating the origin state with the updated list
      state.categoriesList = updatedCategoriesList;
    },

    setDisplayProductsList: (
      state,
      action: PayloadAction<productsListType>
    ) => {
      state.displayProductsList = action.payload;
    },
    resetDisplayProductsList: (state) => {
      state.displayProductsList = state.productsList;
    },
  },
});

export const {
  setProductsDirectory,
  removeProductFromDirectory,
  updateProductInDirectory,
  setDisplayProductsList,
  resetDisplayProductsList,
  addProductToDirectory,
} = productsDirectorySlice.actions;
export default productsDirectorySlice.reducer;
