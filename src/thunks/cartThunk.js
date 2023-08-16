import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (token, thunkAPI) => {
  const url = 'https://admin.myuni-hub.com/api/wishlist'; // Replace with your cart API URL
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
