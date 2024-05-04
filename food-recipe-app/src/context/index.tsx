import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useState,
} from "react";

interface IGlobalContextType {
  search: string;
  setSearch: (search: string) => void;
  data: IState;
  setData: Dispatch<IAction>;
  fetchData: () => void;
}

export const GlobalContext = createContext<IGlobalContextType>({
  search: "",
  setSearch: () => {},
  data: { status: "idle", error: "", data: [] },
  setData: () => {},
  fetchData: () => {},
});

interface IRecipe {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
}

interface IState {
  status: string;
  error: string;
  data: IRecipe[];
}

interface IAction {
  type: string;
  error: string;
  data: IRecipe[];
}

const reducerFunction = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "IDLE":
      return { ...state, status: "IDLE" };
    case "LOADING":
      return { ...state, status: "LOADING" };
    case "SUCCESS":
      return { ...state, status: "SUCCESS" };
    case "ERROR":
      return { ...state, status: "ERROR", error: action.error };
    default:
      return state;
  }
};

const URL = "https://forkify-api.herokuapp.com/api/v2/recipes?search=";

export default function GlobalState({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useReducer(reducerFunction, {
    status: "idle",
    error: "",
    data: [],
  });

  const fetchData = async () => {
    setData({ type: "LOADING", error: "", data: [] });
    try {
      const response = await fetch(`${URL}${search}`);
      const dataResponse = await response.json();
      const values = dataResponse?.data?.recipes;
      if (values.length) {
        setData({ type: "SUCCESS", error: "", data: values });
      }
      setSearch("");
    } catch (error) {
      setData({ type: "ERROR", error: "There was an error", data: [] });
    }
  };

  return (
    <GlobalContext.Provider
      value={{ search, setSearch, data, setData, fetchData }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
