import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/UserSlice';
import { userProfileSlice } from '../thunks/profileThunk';
// import { userProfileReducer } from '../features/UserProfile';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice.reducer,
    userProfile: userProfileSlice.reducer,
  },
});
