import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    payment_intent:{},
    event:null
  },
  reducers: {
    setEvent: (state, action) => {
        // state.payment_intent = action.payload?.intent
        // state.product = action.payload
      return action.payload;
    },
  },
});

export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;