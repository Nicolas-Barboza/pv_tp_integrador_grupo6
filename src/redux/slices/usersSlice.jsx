import { createSlice } from '@reduxjs/toolkit';

// Function auxiliar para analizar JSON de localStorage de forma segura
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

// Function auxiliar para guardar JSON en localStorage de forma segura
const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn(`Could not save state to localStorage key "${key}"`, e);
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    // Intenta cargar usuarios existentes de localStorage, o inicia con un array vacío
    entities: loadFromLocalStorage('users', []), 
    // Intenta cargar el usuario logueado de localStorage, o null si no hay
    sessionUser: loadFromLocalStorage('sessionUser', null),
  },
  reducers: {
    add: (state, action) => {
      // Verifica si el usuario ya existe por email
      state.entities.push(action.payload);
      // Persiste todos los usuarios en localStorage después de añadir uno nuevo
      saveToLocalStorage('users', state.entities);
    },
    setSessionUser: (state, action) => {
      state.sessionUser = action.payload;
      // Persiste el usuario logueado en localStorage
      saveToLocalStorage('sessionUser', action.payload);
    },
    removeSessionUser: (state) => {
      state.sessionUser = null;
      // Limpia el usuario logueado de localStorage
      localStorage.removeItem('sessionUser');
    },
    addInitialUser: (state, action) => {
        if (state.entities.length === 0) {
            state.entities.push(action.payload);
            saveToLocalStorage('users', state.entities);
        }
    }
  },
});

export const { add, setSessionUser, removeSessionUser, addInitialUser } = usersSlice.actions;
export default usersSlice.reducer;