import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  },
  reducers: {
    // Reducer for adding a new product
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    // Reducer for updating an existing product
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const existingProductIndex = state.items.findIndex(product => product.id === id);
      if (existingProductIndex !== -1) {
        state.items[existingProductIndex] = { ...state.items[existingProductIndex], ...updatedProduct };
      }
    },
    // Reducer for deleting a product
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
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

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;