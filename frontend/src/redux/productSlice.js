import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from './../../axios-client';

// Thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosClient.get('products');
  return response.data;
});

// Thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await axiosClient.get(`products/${id}`);
  return response.data;
});

// Thunk to add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosClient.post('products', formData, config);
  return response.data;
});

// Thunk to delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axiosClient.delete(`products/${productId}`);
  return productId;
});

// Thunk to update a product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updatedData }) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosClient.put(`products/${id}`, updatedData, config);
  return response.data;
});

// Thunk to search products
export const searchProducts = createAsyncThunk('products/searchProducts', async (searchTerm) => {
  const response = await axiosClient.get('products/search', {
    params: { searchTerm },  // Send the search term as a query parameter
  });
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],  // Array to hold filtered products
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch a product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add a product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete a product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })

      // Update a product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.selectedProduct = action.payload;
      })

      // Handle search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.filteredItems = action.payload;  // Set the filtered items
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
