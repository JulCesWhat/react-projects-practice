import React, { createContext } from "react";

export const GlobalContext = createContext(null);

interface IGlobalContextProviderProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  return (
    <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
