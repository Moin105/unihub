import { createAsyncThunk } from '@reduxjs/toolkit';
// import { signUp } from '../api/UserApi';
import { SignUps } from '../apis/UserApi';
import { setName } from '../features/UserSlice';
import {SellerSignUp} from '../apis/UserApi'
// import firebase from 'firebase/app';
// import firebase from 'firebase/app'; // Import the core Firebase module
// import * as firebase from '@firebase/app';
// import 'firebase/database'
// import
import {database} from '../firebase'
import { toast } from 'react-toastify';
// function _encode(str) {
//   return encodeURIComponent(str);
// }
// const database = firebase.database();
const _encode = (email) => {
  return email.replace(/\./g, ',');
};
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, thunkAPI) => {
    try {
      const response = await SignUps(userData);
      console.log("firstName",response.message)
      toast.success(response.message)
      if(response.message === 'check your email to verify your account'){
        // thunkAPI.dispatch(toggleModal());
        
        await database()
        .ref("users")
        .child(_encode(userData.email))
        .set({
          id: _encode(userData.email),
          name: userData.name,
          email: userData.email,
          // deviceToken: deviceToken,
        })
        .catch(() => {
          toast.error("Something went wrong with firebase");
          console.log("sadsfdgghmj")
        });
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

      if(response.message == "seller registered successfully"){
        await database()
        .ref("users")
        .child(_encode(userData.email))
        .set({
          id: _encode(userData.email),
          name: userData.name,
          email: userData.email,
          // deviceToken: deviceToken,
        })
        .catch(() => {
          toast.error("Something went wrong with firebase");
          console.log("sadsfdgghmj")
        });
        window.location.href = "/";
      }
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);