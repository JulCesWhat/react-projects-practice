import "./App.css";
import Accordion from "./components/accordion";
import RandomColor from "./components/random-color";
import StarRating from "./components/start-rating";
import ImageSlider from "./components/image-slider";
import LoadMoreProducts from "./components/load-more-products";

function App() {
  return (
    <>
      <Accordion />
      <RandomColor />
      <StarRating stars={10} />
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={10} page={1} />
      <LoadMoreProducts />
    </>
  );
}

export default App;
