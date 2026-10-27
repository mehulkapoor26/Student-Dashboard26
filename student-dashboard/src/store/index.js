import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import academicReducer from './academicSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    academic: academicReducer
  }
});

export default store;
