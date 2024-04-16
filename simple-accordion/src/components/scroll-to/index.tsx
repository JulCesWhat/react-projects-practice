import { useRef } from "react";
import useFetch, { ActionType } from "../../hooks/useFetch";

const ScrollTo = () => {
  const { data, error, status } = useFetch(
    "https://dummyjson.com/products?limit=100",
    undefined
  );
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (status === ActionType.LOADING) {
    return <div>Loading...</div>;
  }
  if (status === ActionType.ERROR) {
    return <div>{error}</div>;
  }
  return (
    <div className="scroll-container">
      <h1>Scroll to Top and Bottom Feature</h1>
      <h3 ref={topRef}>This is the top section</h3>
      <button onClick={scrollToBottom}>Scroll to Bottom</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data?.products &&
          Array.isArray(data?.products) &&
          data?.products?.map((product: any) => (
            <li key={product.id}>{product.title}</li>
          ))}
      </ul>
      <button onClick={scrollToTop}>Scroll to Top</button>
      <h3 ref={bottomRef}>This is the bottom section</h3>
    </div>
  );
};

export default ScrollTo;
