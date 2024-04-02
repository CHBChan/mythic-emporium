import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "./cartReducer"
import ProductsDirectoryReducer from "./productsListReducer"
import FilterReducer from './filterReducer'
import UserReducer from './userReducer'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    productsDirectory: ProductsDirectoryReducer,
    filterOpt: FilterReducer,
    userData: UserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch