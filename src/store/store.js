import { configureStore } from '@reduxjs/toolkit';
import billReducer from './billSlice';

export const store = configureStore({
  reducer: {
    bills: billReducer
  }
});

export default store;
