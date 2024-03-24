import Accordion from "./components/accordion";
import "./App.css";
import RandomColor from "./components/random-color";
import StarRating from "./components/start-rating";

function App() {
  return (
    <>
      <Accordion />
      <RandomColor />
      <StarRating stars={10} />
    </>
  );
}

export default App;
