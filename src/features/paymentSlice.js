import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    payment_intent:{},
    product:null
  },
  reducers: {
    setProduct: (state, action) => {
        // state.payment_intent = action.payload?.intent
        // state.product = action.payload
      return action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;