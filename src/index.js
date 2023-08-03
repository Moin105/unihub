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

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { queryClient, QueryClientProvider } from "./queryClient";
const container = document.getElementById("root");

const root = createRoot(container);
const stripePromise = loadStripe('pk_test_51Mjy4wGJcZyTragrfjTemq91P1GjQSHv0PY40nmeKI1X05Mvf2TVRQaTlFYgJsCHqQC0R7vvZVFKwSGOZiLi5gLU00Wis8v8Al');

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
