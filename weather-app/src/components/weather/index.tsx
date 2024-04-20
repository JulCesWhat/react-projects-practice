import { useState } from "react";

import Search from "./../search";

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<Record<string, string>>({});

  const getWeather = (search: string) => {
    console.log(search);
  };

  return (
    <div>
      <Search getWeather={getWeather} />
    </div>
  );
};
export default Weather;
