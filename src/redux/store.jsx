import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';
import usersReducer from './slices/usersSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer, 
    users: usersReducer,
  },
});

export default store;