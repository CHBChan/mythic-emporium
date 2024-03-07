import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterOpt } from "../interface/interface";
import { initialCart } from "./cartReducer";

export interface initialFilterOpt {
    filter: filterOpt;
}
  
const initialState: initialFilterOpt = {
  filter: {
    category: undefined,
    brand: undefined,
    origin: undefined,
    in_stock: false,
    minPrice: 0,
    maxPrice: 9999,
  }
};

export const filterSlice = createSlice({
  name: "filterOpt",
  initialState,
  reducers: {
    setCategory: (
        state,
        action: PayloadAction<string>
    ) => {
        state.filter = {...state.filter, category: action.payload};
    },
    setBrand: (
        state,
        action: PayloadAction<string>
    ) => {
        state.filter = {...state.filter, brand: action.payload};
    },
    setOrigin: (
        state,
        action: PayloadAction<string>
    ) => {
        state.filter = {...state.filter, origin: action.payload};
    },
    setIn_Stock: (
        state
    ) => {
        state.filter = {...state.filter, in_stock: !state.filter.in_stock};
    },
    setMinPrice: (
        state,
        action: PayloadAction<number>
    ) => {
        state.filter = {...state.filter, minPrice: action.payload};
    },
    setMaxPrice: (
        state,
        action: PayloadAction<number>
    ) => {
        state.filter = {...state.filter, maxPrice: action.payload};
    },
    resetFilter: ( state ) => {
        state.filter = initialState.filter;
    }
  },
});

export const { setCategory, setBrand, setOrigin, setIn_Stock, setMinPrice, setMaxPrice, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
