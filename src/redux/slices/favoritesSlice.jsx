import { createSlice } from '@reduxjs/toolkit';


const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(`Could not load state from localStorage key "${key}"`, e);
    return defaultValue;
  }
};

// Helper function to safely save JSON to localStorage
const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn(`Could not save state to localStorage key "${key}"`, e);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    // Cargar los favoritos desde localStorage al iniciar la aplicación
    items: loadFromLocalStorage('favorites', []), 
  },
  reducers: {
    // Añadir un producto a favoritos
    addFavorite: (state, action) => {
      const product = action.payload;
      // Evitar duplicados
      if (!state.items.some(item => item.id === product.id)) {
        state.items.push(product);
        saveToLocalStorage('favorites', state.items); // Guardar en localStorage
      }
    },
    // Eliminar un producto de favoritos
    removeFavorite: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      saveToLocalStorage('favorites', state.items); // Guardar en localStorage
    },
    // Opcional: Limpiar favoritos (ej. al cerrar sesión, si quieres que sean por usuario)
    clearFavorites: (state) => {
        state.items = [];
        localStorage.removeItem('favorites'); // Limpiar de localStorage
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;