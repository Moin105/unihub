import { createSlice } from '@reduxjs/toolkit';
// import { signUpUser } from '../thunks/authThunks';
// import { signUp } from '../api/UserApi';
import { signUpUser } from '../thunks/userThunks';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    user: null
  },
  reducers: {
    setName: (state, action) => {
      state.user.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      });
  }
});
