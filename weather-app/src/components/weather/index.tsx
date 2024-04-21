import { useEffect, useReducer } from "react";

import Search from "./../search";

const API_KEY = "";

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

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      setState({ type: "SET_WEATHER_DATA", payload: data });
    } catch (error) {
      setState({ type: "SET_ERROR", payload: "There was an error" });
    }
  };

  return (
    <div>
      <Search getWeather={fetchWeather} />
      {status === "LOADING" ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="city-name">
            <h2>
              {weatherData.name},<span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{currentDate}</span>
          </div>
          <div>{weatherData?.main?.temp}</div>
          <p className="description">
            {weatherData?.weather && weatherData?.weather[0]?.description}
          </p>
          <div className="weather-info">
            <div>
              <div>
                <p className="wind">
                  {weatherData?.wind?.speed} <span>km/h</span>
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div>
              <div>
                <p className="humidity">
                  {weatherData?.main?.humidity} <span>%</span>
                </p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </>
      )}
      {status === "ERROR" && <div>{error}</div>}
    </div>
  );
};
export default Weather;
