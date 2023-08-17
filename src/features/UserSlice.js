import { createSlice } from '@reduxjs/toolkit';
// import { signUpUser } from '../thunks/authThunks';
// import { signUp } from '../api/UserApi';
import { signUpUser } from '../thunks/userThunks';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    user: null,
    token:null,
    role:null,
    seller_switched: false
  },
  reducers: {
    setName: (state, action) => {
      console.log("action.payload",action.payload)
      state.user = action.payload.user;
      state.role = action.payload.role; 
      state.token = action.payload.token;
    },
    setStudentRole: (state, action) => {
      console.log("action.payload",action.payload)
      // state.user = action.payload.user;
      if (action.payload && action.payload.message === "switched to seller successfully!") {
        // Update the state.user with the user data
        console.log("student is switched to seller successfully!")
        state.seller_switched = true;
      }else{
        console.log("student is not switched to seller successfully!")
        state.seller_switched = false;
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.role = null ;
      state.seller_switched = null;
    },
  },
});
export const { setToken,setName,setStudentRole,clearToken } = authSlice.actions;
export default authSlice.reducer;