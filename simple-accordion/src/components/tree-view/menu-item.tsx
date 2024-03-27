import { useState } from "react";

import { IMenuItem } from "./data";
import MenuList from "./menu-list";

const MenuItem = ({ item }: { item: IMenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <div className="item-title">
        <h3>{item.label}</h3>
        {item.children?.length && (
          <span
            onClick={() => {
              if (!item?.children?.length) return;
              setIsOpen((state) => !state);
            }}
          >
            {isOpen ? "-" : "+"}
          </span>
        )}
      </div>
      {isOpen && item?.children?.length ? (
        <MenuList list={item.children} />
      ) : null}
    </li>
  );
};
export default MenuItem;
