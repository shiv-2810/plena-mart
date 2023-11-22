import { configureStore } from '@reduxjs/toolkit'

import {cartReducer} from './features/products'
import favoritesReducer from './features/favourites'

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    cart: cartReducer,
    favorites:favoritesReducer
  }
})