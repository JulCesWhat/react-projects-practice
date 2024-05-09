import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface IGlobalContextType {
  search: string;
  setSearch: (search: string) => void;
  data: IState;
  setData: Dispatch<IAction>;
  fetchData: () => void;
  recipeDetails: IRecipeDetails | null;
  setRecipeDetails: Dispatch<IRecipeDetails>;
  favorites: IRecipe[];
  saveToFavorites: (recipeToBeAdded: IRecipe) => void;
}

export const GlobalContext = createContext<IGlobalContextType>({
  search: "",
  setSearch: () => {},
  data: { status: "idle", error: "", recipes: [] },
  setData: () => {},
  fetchData: () => {},
  recipeDetails: null,
  setRecipeDetails: () => {},
  favorites: [],
  saveToFavorites: () => {},
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
    status: "IDLE",
    error: "",
    recipes: [],
  });
  const [recipeDetails, setRecipeDetails] = useState<IRecipeDetails | null>(
    null
  );
  const [favorites, setFavorites] = useState<IRecipe[] | []>([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    setData({ type: "LOADING", error: "", recipes: [] });
    try {
      const response = await fetch(`${URL}${search}`);
      const dataResponse = await response.json();
      const values = dataResponse?.data?.recipes;
      if (values.length) {
        setData({ type: "SUCCESS", error: "", recipes: [...values] });
      } else {
        setData({ type: "ERROR", error: "No recipes found", recipes: [] });
      }
      setSearch("");
      navigate("/");
    } catch (error) {
      setData({ type: "ERROR", error: "There was an error", recipes: [] });
    }
  };

  const saveToFavorites = (recipeToBeAdded: IRecipe) => {
    const item = favorites.some((recipe) => recipe.id === recipeToBeAdded.id);
    if (item) {
      setFavorites(
        favorites.filter((recipe) => recipe.id !== recipeToBeAdded.id)
      );
    } else {
      setFavorites([...favorites, recipeToBeAdded]);
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
        favorites,
        saveToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
