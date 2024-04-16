import useWindowResize from "../../hooks/useWindowResize";

const TestWindowResizeHook = () => {
  const { width, height } = useWindowResize();
  return (
    <div>
      <h1>Width: {width}</h1>
      <h1>Height: {height}</h1>
    </div>
  );
};

export default TestWindowResizeHook;
