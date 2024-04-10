import "./App.css";
import Accordion from "./components/accordion";
import RandomColor from "./components/random-color";
import StarRating from "./components/start-rating";
import ImageSlider from "./components/image-slider";
import LoadMoreProducts from "./components/load-more-products";
import TreeView from "./components/tree-view";
import menuList from "./components/tree-view/data";
import QrCodeGenerator from "./components/qr-code-generator";
import LightDarkMode from "./components/light-dark-mode";
import ScrollIndicator from "./components/scroll-indicator";
import CustomTabs from "./components/custom-tabs";
import CustomModal from "./components/custom-modal-popup";
import ProfileFinder from "./components/profile-finder";
import SearchAutoComplete from "./components/search-auto-complete";
import TicTacToe from "./components/tac-tac-toe";

function App() {
  return (
    <>
      <Accordion />
      <RandomColor />
      <StarRating stars={10} />
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={10} page={1} />
      <LoadMoreProducts />
      <TreeView list={menuList} />
      <QrCodeGenerator />
      <LightDarkMode />
      <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} />
      <CustomTabs />
      <CustomModal />
      <ProfileFinder />
      <SearchAutoComplete />
      <TicTacToe />
    </>
  );
}

export default App;
