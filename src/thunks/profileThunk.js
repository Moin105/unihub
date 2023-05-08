import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};
export const getToken = () => {
    return localStorage.getItem('token')
  }
// export const fetchUserProfile = createAsyncThunk(
//   'profile/fetchUserProfile',
//   async () => {
//     const response = await axios.get('http://34.233.35.208/api/my_profile');
//     return response.data;
//   }
// );
export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (_, thunkAPI) => {
        const token = getToken()
        if (!token) {
        //   return rejectWithValue('Token not found in local storage')
        }
    //   const token = thunkAPI.getState().auth.token;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://34.233.35.208/api/my_profile', { headers });
      return response.data;
    }
  );


export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export default userProfileSlice.reducer;
