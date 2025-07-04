import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Helper functions
const loadProductsFromStorage = () => {
  try {
    const serialized = localStorage.getItem('products');
    return serialized ? JSON.parse(serialized) : null; // Cambiado a null para distinguir cuando no hay datos
  } catch (e) {
    console.error("Error loading products from localStorage", e);
    return null;
  }
};

const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (e) {
    console.error("Error saving products to localStorage", e);
  }
};

// Async thunk con flag para forzar refresco
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (forceRefresh = false) => { // Parámetro para forzar refresco desde API
    const localProducts = !forceRefresh ? loadProductsFromStorage() : null;
     if (localProducts && localProducts.length > 0) {
      return localProducts;
    }

    const response = await fetch('https://fakestoreapi.com/products');
    const apiProducts = await response.json();
    saveProductsToStorage(apiProducts); // Guarda los productos de la API
    return apiProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    categoryFilter: 'all',
    lastUpdated: null
  },
  reducers: {
    addProduct: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        saveProductsToStorage(state.items);
        state.lastUpdated = Date.now();
      },
      prepare: (product) => {
        const id = Date.now();
        return { payload: { ...product, id } };
      }
    },
        updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.items.findIndex(p => p.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedProduct };
        saveProductsToStorage(state.items);
        state.lastUpdated = Date.now();
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      saveProductsToStorage(state.items);
      state.lastUpdated = Date.now();
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.categoryFilter = 'all';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectores básicos
export const selectAllProducts = (state) => state.products.items;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectCategoryFilter = (state) => state.products.categoryFilter;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;


// Selector para productos filtrados (optimizado)
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchTerm, selectCategoryFilter],
  (items, searchTerm, categoryFilter) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return items.filter(product => {
      const matchesCategory = categoryFilter === 'all' ||
        product.category === categoryFilter;

      const matchesSearch = !searchTerm ||
        product.title.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm);

      return matchesCategory && matchesSearch;
    });
  }
);


export const { addProduct, updateProduct, deleteProduct, setSearchTerm, setCategoryFilter, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;