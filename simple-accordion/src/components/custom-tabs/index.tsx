import { useState } from "react";
import "./styles.css";

interface ITab {
  tabsContent: {
    label: string;
    content: JSX.Element;
  }[];
  onChange: (index: number) => void;
}

const Tabs = ({ tabsContent, onChange }: ITab) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleOnClick = (index: number) => {
    setTabIndex(index);
    onChange(index);
  };
  return (
    <div className="wrapper-tab">
      <div className="heading">
        {tabsContent.map((tab, index) => (
          <div
            className={`tab-item ${tabIndex === index ? "active" : ""}`}
            key={tab.label}
            onClick={() => {
              handleOnClick(index);
            }}
          >
            <span className="label">{tab.label}</span>
          </div>
        ))}
      </div>
      <div className="content">{tabsContent[tabIndex].content}</div>
    </div>
  );
};

const tabsContent = [
  {
    label: "Tab 1",
    content: <p>Content 1</p>,
  },
  {
    label: "Tab 2",
    content: <span>"Content 2"</span>,
  },
  {
    label: "Tab 3",
    content: <div>Content 3</div>,
  },
];

const CustomTabs = () => {
  const onChange = (index: number) => {
    console.log(index);
  };
  return <Tabs tabsContent={tabsContent} onChange={onChange} />;
};

export default CustomTabs;
