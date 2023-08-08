import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';


export const GetToken = () => {
  const token = useSelector((state) => state.auth.token);
    return token
  }
// export const fetchUserProfile = createAsyncThunk(
//     'profile/fetchUserProfile',
//     async (_, thunkAPI) => {
//       const token = useSelector((state) => state.auth.token);
//     //   const token = thunkAPI.getState().auth.token;
//     console.log("asdasdsadsadasd")
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await axios.get('https://admin.myuni-hub.com/api/my_profile', { headers });
//       console.log("ewew",response.data)
//       return response.data;
//     }
//   );

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    console.log("asdasdsadsadasd");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get('https://admin.myuni-hub.com/api/my_profile', { headers });
    console.log("ewew", response.data.profile);
    return response.data.profile;
  }
);

