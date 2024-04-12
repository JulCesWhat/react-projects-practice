import { useEffect, useReducer } from "react";

export enum ActionType {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface IState {
  data: any;
  error: string;
  status: ActionType;
}

export interface IAction {
  data: any;
  error: string;
  type: ActionType;
}

const reducerFunction = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.IDLE:
      return { ...state, status: ActionType.IDLE };
    case ActionType.LOADING:
      return { ...state, status: ActionType.LOADING, error: "", data: null };
    case ActionType.SUCCESS:
      return { ...state, status: ActionType.SUCCESS, data: action.data };
    case ActionType.ERROR:
      return { ...state, status: ActionType.ERROR, error: action.error };
    default:
      return state;
  }
};

const useFetch = (url: string, options: RequestInit | undefined): IState => {
  const [{ data, error, status }, dispatch] = useReducer(reducerFunction, {
    data: null,
    error: "",
    status: ActionType.IDLE,
  });

  const fetchCall = async (url: string, options: RequestInit | undefined) => {
    try {
      dispatch({ type: ActionType.LOADING, error: "", data: null });
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const json = await res.json();
      dispatch({ type: ActionType.SUCCESS, error: "", data: json });
    } catch (error) {
      dispatch({
        type: ActionType.ERROR,
        error: `There was an error: ${error}!!`,
        data: null,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchCall(url, options);
  }, [url, options]);

  return { data, error, status };
};

export default useFetch;
