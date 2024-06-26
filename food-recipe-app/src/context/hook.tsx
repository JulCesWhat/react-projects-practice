import { useContext } from "react";
import { GlobalContext } from ".";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalState");
  }
  return context;
};
