import { createAsyncThunk } from '@reduxjs/toolkit';
// import { signUp } from '../api/UserApi';
import { SignUps } from '../apis/UserApi';
import { setName } from '../features/UserSlice';
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, thunkAPI) => {
    try {
      const response = await SignUps(userData);
      console.log("firstName",response)
      thunkAPI.dispatch(setName(response)); 
      return response;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);