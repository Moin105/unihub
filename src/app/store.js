import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/UserSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice.reducer
  },
});
