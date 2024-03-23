import { useState } from "react";
import data from "./data";

const Accordion = () => {
  const [selected, setSelected] = useState<number>(-1);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleOnClick = (index: number) => {
    if (multiSelect) {
      if (selectedItems.includes(index)) {
        setSelectedItems((prev) => prev.filter((item) => item !== index));
      } else {
        setSelectedItems((prev) => [...prev, index]);
      }
    } else {
      if (selected === index) {
        setSelected(-1);
      } else {
        setSelected(index);
      }
    }
  };

  const onBtnClick = () => {
    setMultiSelect((prev) => !prev);
    setSelectedItems([]);
    setSelected(-1);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div>
          <button onClick={onBtnClick}>
            {multiSelect ? "Single Select" : "Multi Select"}
          </button>
        </div>
        <div className="accordion">
          {data && data.length ? (
            data.map((item) => {
              return (
                <div
                  className="item"
                  onClick={() => {
                    handleOnClick(item.id);
                  }}
                >
                  <div className="title" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <h3 style={{
                      paddingRight: "10px",
                    }}>{item.question}</h3>
                    {selected === item.id ? <span>-</span> : <span>+</span>}
                  </div>
                  {(selected === item.id ||
                    selectedItems.includes(item.id)) && (
                    <div className="content">
                      <span>{item.answer}</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <h1>No data</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
