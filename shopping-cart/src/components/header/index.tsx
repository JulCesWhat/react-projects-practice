import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="flex items-center flex-row justify-between h-20 max-w-6xl mx-auto">
        <div className="ml-5">
          <Link to="/">
            <h1 className="font-bold text-xl sm:text-2xl">
              React Redux Shopping Cart
            </h1>
          </Link>
        </div>
        <ul className="flex list-none items-center space-x-6 text-gray-800 font-semibold">
          <li className="cursor-pointer list-none">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer list-none">
            <Link to={"/cart"}>Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
