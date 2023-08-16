import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme/theme";
import { PersistGate } from "redux-persist/integration/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { queryClient, QueryClientProvider } from "./queryClient";
const container = document.getElementById("root");

const root = createRoot(container);
const firebaseConfig = {
  apiKey: "AIzaSyBSGayAJ5g9Yn6Bxail48JlA8F1njPHQ8k",
  authDomain: "unihub-app.firebaseapp.com",
  databaseURL: "https://unihub-app-default-rtdb.firebaseio.com",
  projectId: "unihub-app",
  storageBucket: "unihub-app.appspot.com",
  messagingSenderId: "444829181838",
  appId: "1:444829181838:web:46a2856f003bfe2d60a6df",
  measurementId: "G-KM9TVHGWBV"
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      
      {/* <QueryClientProvider client={queryClient}> */}
      <ChakraProvider theme={theme}>
        {/* <Router> */}
        {/* <Elements stripe={stripePromise}> */}
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        {/* </Elements> */}
        {/* </Router> */}
      </ChakraProvider>
      {/* </QueryClientProvider > */}
    </Provider>
  </React.StrictMode>
);
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
