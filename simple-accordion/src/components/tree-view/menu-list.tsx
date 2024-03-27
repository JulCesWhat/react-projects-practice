import { IMenuItem } from "./data";
import MenuItem from "./menu-item";

const MenuList = ({ list }: { list: IMenuItem[] }) => {
  return (
    <ul className="menu-list-container">
      {list && list.length
        ? list.map((item) => {
            return <MenuItem key={item.label} item={item} />;
          })
        : null}
    </ul>
  );
};
export default MenuList;
