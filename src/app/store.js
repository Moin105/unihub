// import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/UserSlice';
import { userProfileSlice } from '../thunks/profileThunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { productSlice } from '../features/paymentSlice';
import { serviceSlice } from '../features/serviceSlice';
import { eventSlice } from '../features/eventSlice';
const persistConfig = {
  key: 'root', // Key for the persisted data in storage
  storage, // Storage type
};
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userProfileSlice.reducer,
    product:productSlice.reducer,
    service:serviceSlice.reducer,
    event:eventSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer

});


export const persistor = persistStore(store);

