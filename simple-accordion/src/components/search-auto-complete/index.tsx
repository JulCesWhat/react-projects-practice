import { useEffect, useReducer, useState } from "react";
import "./styles.css";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface IState {
  status: string;
  error: string;
}

interface IAction {
  type: string;
  error: string;
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

const SearchAutoComplete = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [status, setStatus] = useReducer(reducerFunction, {
    status: "idle",
    error: "",
  });

  useEffect(() => {
    setStatus({ type: "LOADING", error: "" });
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data?.users?.map((u: IUser) => u.firstName) || []);
        setStatus({ type: "SUCCESS", error: "" });
      })
      .catch((error) => {
        setStatus({
          type: "ERROR",
          error: `There was an error: ${error.error}!!`,
        });
      });
  }, []);

  useEffect(() => {
    if (searchTerm === "") return;
    const fillUsers =
      searchTerm.length >= 2
        ? users.filter((u) =>
            u.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
    setFilteredUsers(fillUsers);
  }, [searchTerm, users]);

  const handleOnSearchClick = (selectedUser: string) => {
    setSearchTerm(selectedUser);
    setFilteredUsers([]);
    setSearching(false);
  };

  if (status.status === "LOADING") return <div>Loading...</div>;
  if (status.status === "ERROR") return <div>{status.error}</div>;

  return (
    <div className="search-auto-complete-container">
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSearching(true);
        }}
      />
      {filteredUsers.length > 0 && searching && (
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index} onClick={() => handleOnSearchClick(user)}>
              {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchAutoComplete;
