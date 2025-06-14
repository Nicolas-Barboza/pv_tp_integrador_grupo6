import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer, 
  },
});

export default store;