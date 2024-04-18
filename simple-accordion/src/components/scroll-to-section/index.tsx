import { useRef } from "react";

const ScrollToSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const data = [
    {
      label: "First",
      style: {
        backgroundColor: "red",
        color: "white",
        height: "600px",
        width: "100%",
      },
    },
    {
      label: "Second",
      style: {
        backgroundColor: "orange",
        color: "white",
        height: "600px",
        width: "100%",
      },
    },
    {
      label: "Third",
      style: {
        backgroundColor: "blue",
        color: "white",
        height: "600px",
        width: "100%",
      },
    },
    {
      label: "Fourth",
      style: {
        backgroundColor: "green",
        color: "white",
        height: "600px",
        width: "100%",
      },
    },
  ];

  const scrollToSection = () => {
    const pos = ref.current?.getBoundingClientRect().top;
    window.scrollTo({
      top: pos,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <h1>Scroll to a particular section</h1>
      <button onClick={scrollToSection}>Click to Scroll</button>
      {data.map((item, index) => {
        return (
          <div ref={index === 2 ? ref : null} key={index} style={item.style}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default ScrollToSection;
