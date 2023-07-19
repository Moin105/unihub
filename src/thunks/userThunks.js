import { createAsyncThunk } from '@reduxjs/toolkit';
// import { signUp } from '../api/UserApi';
import { SignUps } from '../apis/UserApi';
import { setName } from '../features/UserSlice';
import {SellerSignUp} from '../apis/UserApi'
import { toast } from 'react-toastify';
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, thunkAPI) => {
    try {
      const response = await SignUps(userData);
      console.log("firstName",response.message)
      if(response.message === 'check your email to verify your account'){
        window.location.href = "/login";
      }
      // thunkAPI.dispatch(setName(response)); 
      // return response;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const sellerSignUpUser = createAsyncThunk(
  'auth/signUpUserSeller',
  async (userData, thunkAPI) => {
    try {
      const response = await SellerSignUp(userData);
      console.log("firstName",response)
      thunkAPI.dispatch(setName(response)); 
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);