import { useEffect, useState } from "react";
import "./styles.css";

interface IProduct {
  id: number;
  title: string;
  description: string;
}

const ScrollIndicator = ({ url }: { url: string }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchData = async (getUrl: string) => {
      try {
        setLoading(true);
        const response = await fetch(getUrl);
        const data = await response.json();
        setData(data.products);
      } catch (error) {
        console.error(error);
        setError("There was an error");
      } finally {
        setLoading(false);
      }
    };
    fetchData(url);
  }, [url]);

  useEffect(() => {
    const handleScroll = () => {
      const howFarScrolled =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollY((howFarScrolled / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{
              width: `${scrollY}%`,
            }}
          ></div>
        </div>
      </div>
      <h1>Products</h1>
      <ul>
        {data &&
          data.map((product: IProduct) => (
            <li key={product.id}>{product.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default ScrollIndicator;
