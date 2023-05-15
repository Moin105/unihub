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
      console.log("action.payload",action.payload)
      state.user = action.payload;
      // localStorage.setItem('userData', action.payload.user);
      
      localStorage.setItem('token', action.payload.token);
      // state.user.token= localStorage.getItem('token') || null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // if(action.payload.token !== undefined){
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(signUpUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //       state.user = null;
  //     })
  //     .addCase(signUpUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.user = action.payload;
  //     })
  //     .addCase(signUpUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //       state.user = null;
  //     });
  // }
});
export const { setToken,setName } = authSlice.actions;
export default authSlice.reducer;