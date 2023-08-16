import { createSlice } from '@reduxjs/toolkit';
import { fetchCart } from '../thunks/cartThunk';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Define other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Assumes the API returns an array of items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
