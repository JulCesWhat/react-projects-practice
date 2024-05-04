import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/hook";

export default function Navbar() {
  const { search, setSearch, fetchData } = useGlobalContext();

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold">
        <NavLink to="/" className="text-black hover:text-gray-700 duration-300">
          Food Stuff
        </NavLink>
      </h2>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          fetchData();
          return false;
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search for recipes"
          className="bg-white/75 p-3 px-8 rou nded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to="/"
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className="text-black hover:text-gray-700 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
