import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Define the async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchTerm: '',
    categoryFilter: 'all',
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const existingProductIndex = state.items.findIndex(product => product.id === id);
      if (existingProductIndex !== -1) {
        state.items[existingProductIndex] = { ...state.items[existingProductIndex], ...updatedProduct };
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
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