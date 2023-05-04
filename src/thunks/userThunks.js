import { createAsyncThunk } from '@reduxjs/toolkit';
// import { signUp } from '../api/UserApi';
import { signUp } from '../apis/UserApi';
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, thunkAPI) => {
    try {
      const response = await signUp(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);