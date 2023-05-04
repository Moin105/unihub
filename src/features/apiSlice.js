import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {},
  reducers: {
    setData: (state, action) => {
      const { endpoint, data } = action.payload;
      state[endpoint] = data;
    },
  },
});