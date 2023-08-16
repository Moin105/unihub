// import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/UserSlice';
// import { userProfileSlice } from '../thunks/profileThunk';
import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { productSlice } from '../features/paymentSlice';
import { serviceSlice } from '../features/serviceSlice';
import {userProfileSlice} from '../features/UserProfileSlice'
import { cartSlice } from '../features/cartSlice';
import { eventSlice } from '../features/eventSlice';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root', // Key for the persisted data in storage
  storage, // Storage type
};
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userProfileSlice.reducer,
    product:productSlice.reducer,
    service:serviceSlice.reducer,
    event:eventSlice.reducer,
    cart: cartSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export const persistor = persistStore(store);

