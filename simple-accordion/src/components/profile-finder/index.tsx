import { useReducer, useState } from "react";
import "./styles.css";

interface IContent {
  avatar_url: string;
  bio: string;
  company: string;
  name: string;
}

const GITHUB_URL = "https://api.github.com/users/";

enum ProfileStatusTypes {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface IProfileState {
  status: ProfileStatusTypes;
  error: string;
}

interface IProfileAction {
  type: string;
  payload: string;
}

const profileReducer = (
  state: IProfileState,
  { type, payload }: IProfileAction
): IProfileState => {
  switch (type) {
    case ProfileStatusTypes.INITIAL:
      return { ...state, status: ProfileStatusTypes.INITIAL };
    case ProfileStatusTypes.LOADING:
      return { ...state, status: ProfileStatusTypes.LOADING };
    case ProfileStatusTypes.SUCCESS:
      return { ...state, status: ProfileStatusTypes.SUCCESS, error: "" };
    case ProfileStatusTypes.ERROR:
      return { ...state, status: ProfileStatusTypes.ERROR, error: payload };
    default:
      return state;
  }
};

const ProfileFinder = () => {
  const [profile, setProfile] = useState("");
  const [content, setContent] = useState<IContent | null>(null);
  const [{ status, error }, dispatch] = useReducer(profileReducer, {
    status: ProfileStatusTypes.INITIAL,
    error: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(e.target.value);
  };
  const handleOnClick = async () => {
    try {
      dispatch({ type: ProfileStatusTypes.LOADING, payload: "" });
      const response = await fetch(`${GITHUB_URL}${profile}`);
      const data = await response.json();
      dispatch({ type: ProfileStatusTypes.SUCCESS, payload: "" });
      setContent(data);
      setProfile("");
    } catch (error) {
      dispatch({
        type: ProfileStatusTypes.ERROR,
        payload: "Error while loading data!!",
      });
      console.error(error);
    }
  };

  if (status === ProfileStatusTypes.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === ProfileStatusTypes.ERROR) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="input-wrapper">
        <input
          name="profile-search"
          type="text"
          onChange={handleOnChange}
          value={profile}
        />
        <button onClick={handleOnClick}>Search</button>
      </div>

      {content && (
        <div className="content-wrapper">
          <img src={content.avatar_url} alt={content.name} />
          <h2>{content.name}</h2>
          <p>{content.bio}</p>
          <p>{content.company}</p>
        </div>
      )}
    </div>
  );
};
export default ProfileFinder;
