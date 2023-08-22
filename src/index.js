import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme/theme";
import { PersistGate } from "redux-persist/integration/react";
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
