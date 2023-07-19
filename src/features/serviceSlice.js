import { createSlice } from '@reduxjs/toolkit';

export const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    payment_intent:{},
    service:null
  },
  reducers: {
    setService: (state, action) => {
        // state.payment_intent = action.payload?.intent
        // state.product = action.payload
      return action.payload;
    },
  },
});

export const { setService } = serviceSlice.actions;
export default serviceSlice.reducer;