import { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState<string>("#000");

  const randomUtility = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const generateRandomColor = (typeOf: string) => {
    if (typeOf === "hex") {
      const part = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];
      const arr = Array.from({ length: 6 }, () => part[randomUtility(16)]);
      setColor(`#${arr.join("")}`);
      //   setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    } else {
      setColor(
        `rgb(${randomUtility(255)}, ${randomUtility(255)}, ${randomUtility(
          255
        )})`
      );
    }
  };

  useEffect(() => {
    generateRandomColor(typeOfColor);
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: color,
      }}
    >
      <button
        onClick={() => {
          setTypeOfColor("hex");
          //   if (typeOfColor === "rgb") {
          //     generateRandomColor("hex");
          //   }
        }}
      >
        Generate HEX Color
      </button>
      <button
        onClick={() => {
          setTypeOfColor("rgb");
          //   if (typeOfColor === "hex") {
          //     generateRandomColor("rgb");
          //   }
        }}
      >
        Generate RGB Color
      </button>
      <button
        onClick={() => {
          generateRandomColor(typeOfColor);
        }}
      >
        Generate Random Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          flexDirection: "column",
        }}
      >
        <h2>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h2>
        <h1>{color}</h1>
      </div>
    </div>
  );
};

export default RandomColor;
