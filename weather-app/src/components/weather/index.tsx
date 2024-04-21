import { useEffect, useReducer } from "react";

import Search from "./../search";

const API_KEY = "4d708693fff247cbf86d09183bd5abc6";

interface IState {
  status: string;
  weatherData: Record<string, string>;
  error: string;
}

const reducerFunction = (
  state: IState,
  action: Record<string, string | Record<string, string>>
): IState => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        status: "ERROR",
        error: action.payload as string,
      };
    case "SET_LOADING":
      return {
        ...state,
        status: "LOADING",
        error: "",
      };
    case "SET_WEATHER_DATA":
      return {
        ...state,
        status: "IDLE",
        weatherData: action.payload as Record<string, string>,
        error: "",
      };
    default:
      return state;
  }
};

const Weather = () => {
  const [{ status, error, weatherData }, setState] = useReducer(
    reducerFunction,
    {
      status: "IDLE",
      weatherData: {},
      error: "",
    }
  );

  useEffect(() => {
    fetchWeather("Pensacola");
  }, []);

  const fetchWeather = async (search: string) => {
    try {
      setState({ type: "SET_LOADING" });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data)
      setState({ type: "SET_WEATHER_DATA", payload: data });
    } catch (error) {
      console.error(error);
      setState({ type: "SET_ERROR", payload: "There was an error" });
    }
  };

  const getWeather = (search: string) => {
    console.log(search);
    fetchWeather(search);
  };

  return (
    <div>
      <Search getWeather={getWeather} />
      {status === "LOADING" ? (
        <div>...Loading</div>
      ) : (
        <div>
          <h2>{weatherData.name}</h2>
          {/* <h3>{weatherData.weather[0]?.description}</h3>
          <h3>{weatherData.main?.temp}</h3> */}
        </div>
      )}
      {status === "ERROR" && <div>{error}</div>}
    </div>
  );
};
export default Weather;
