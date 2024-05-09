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
  recipeDetails: IRecipeDetails | null;
  setRecipeDetails: Dispatch<IRecipeDetails>;
}

export const GlobalContext = createContext<IGlobalContextType>({
  search: "",
  setSearch: () => {},
  data: { status: "idle", error: "", recipes: [] },
  setData: () => {},
  fetchData: () => {},
  recipeDetails: null,
  setRecipeDetails: () => {},
});

export interface IIngredient {
  quantity: number | null;
  unit: string;
  description: string;
}

export interface IRecipeDetails {
  publisher: string;
  ingredients: IIngredient[];
  source_url: string;
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id: string;
}

export interface IRecipe {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
}

interface IState {
  status: string;
  error: string;
  recipes: IRecipe[];
}

interface IAction {
  type: string;
  error: string;
  recipes: IRecipe[];
}

const reducerFunction = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "IDLE":
      return { ...state, status: "IDLE", recipes: [] };
    case "LOADING":
      return { ...state, status: "LOADING", recipes: [] };
    case "SUCCESS":
      return { ...state, status: "SUCCESS", recipes: action.recipes };
    case "ERROR":
      return { ...state, status: "ERROR", recipes: [], error: action.error };
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
    recipes: [],
  });
  const [recipeDetails, setRecipeDetails] = useState<IRecipeDetails | null>(
    null
  );

  const fetchData = async () => {
    setData({ type: "LOADING", error: "", recipes: [] });
    try {
      const response = await fetch(`${URL}${search}`);
      const dataResponse = await response.json();
      const values = dataResponse?.data?.recipes;
      if (values.length) {
        setData({ type: "SUCCESS", error: "", recipes: [...values] });
      }
      setSearch("");
    } catch (error) {
      setData({ type: "ERROR", error: "There was an error", recipes: [] });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
        data,
        setData,
        fetchData,
        recipeDetails,
        setRecipeDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
