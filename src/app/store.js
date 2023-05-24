// import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/UserSlice';
import { userProfileSlice } from '../thunks/profileThunk';


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose the storage type (e.g., localStorage)

// Import your reducers
// import rootReducer from './reducers'; // Replace with your root reducer
// // import { userProfileReducer } from '../features/UserProfile';
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     auth: authSlice.reducer,
//     userProfile: userProfileSlice.reducer,
//   },
// });

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for the persisted data in storage
  storage, // Storage type
  // You can specify additional configuration options here, such as whitelist or blacklist
};
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userProfileSlice.reducer,
})
// Create a persisted reducer using the root reducer and the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
// const store = configureStore({
//   reducer: persistedReducer,
//   // Other store configuration options
// });
export const store = configureStore({
  reducer: persistedReducer
  // {
  //   counter: counterReducer,
  //   auth: authSlice.reducer,
  //   userProfile: userProfileSlice.reducer,
  // },
});


// Create the persisted store
export const persistor = persistStore(store);

// export { store, persistor };
