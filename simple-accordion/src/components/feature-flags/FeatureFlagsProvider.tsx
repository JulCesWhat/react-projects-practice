import { createContext, useContext, useEffect, useReducer } from "react";

import getFeatureFlags, { IFeatureFlags } from "./data";

const FeatureFlagsContext = createContext({
  status: "idle",
  error: "",
  flags: {} as IFeatureFlags,
});

interface FeatureFlagsProviderProps {
  children: React.ReactNode;
}

interface IState {
  status: string;
  error: string;
  flags: IFeatureFlags;
}

interface IAction {
  type: string;
  error: string;
  flags: IFeatureFlags;
}

const reducerFunction = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "IDLE":
      return { ...state, status: "idle" };
    case "LOADING":
      return { ...state, status: "loading", error: "" };
    case "SUCCESS":
      return { ...state, status: "success", flags: action.flags };
    case "ERROR":
      return { ...state, status: "error", error: action.error };
    default:
      return state;
  }
};

const FeatureFlagsProvider = ({ children }: FeatureFlagsProviderProps) => {
  const [featureFlags, setFeatureFlags] = useReducer(reducerFunction, {
    status: "idle",
    error: "",
    flags: {} as IFeatureFlags,
  });

  useEffect(() => {
    setFeatureFlags({ type: "LOADING", error: "", flags: {} as IFeatureFlags });
    getFeatureFlags()
      .then((data) => {
        setFeatureFlags({ type: "SUCCESS", flags: data, error: "" });
      })
      .catch((error) => {
        setFeatureFlags({
          type: "ERROR",
          flags: {} as IFeatureFlags,
          error: `There was an error: ${error.error}!!`,
        });
      });
  }, []);

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider"
    );
  }
  return context;
};

export { FeatureFlagsProvider, useFeatureFlags };
