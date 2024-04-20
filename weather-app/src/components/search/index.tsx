import { useState } from "react";

interface ISearch {
  getWeather: (search: string) => void;
}

const Search = ({ getWeather }: ISearch) => {
  const [search, setSearch] = useState("");
  return (
    <div className="search-engine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        name="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        className="search-btn"
        onClick={() => {
          getWeather(search);
        }}
      >
        Search Weather
      </button>
    </div>
  );
};
export default Search;
