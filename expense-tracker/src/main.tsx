import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import GlobalContextProvider from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
