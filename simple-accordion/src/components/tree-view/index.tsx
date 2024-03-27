import { IMenuItem } from "./data";
import MenuList from "./menu-list";
import "./styles.css";

const TreeView = ({ list }: { list: IMenuItem[] }) => {
  return (
    <div className="tree-view-container">
      <MenuList list={list} />
    </div>
  );
};
export default TreeView;
