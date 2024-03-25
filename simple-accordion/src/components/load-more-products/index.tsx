import { useEffect, useState } from "react";
import "./styles.css";

interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

const LoadMoreProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData(count);
  }, [count]);

  const loadData = async (limit: number) => {
    // load data
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          limit === 0 ? 0 : limit * 20
        }`
      );
      const data = await response.json();
      if (data && data?.products?.length > 0) {
        setProducts((state: IProduct[]) => {
          const map = new Map<number, IProduct>();
          for (const product of state) {
            map.set(product.id, product);
          }
          for (const product of data.products) {
            map.set(product.id, product);
          }
          return Array.from(map.values());
        });
      }
    } catch (error) {
      setError("Error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const onLoadMore = () => {
    setCount(count + 1);
  };

  if (loading && products.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products.length
          ? products.map((item) => {
              return (
                <div key={item.id} className="product">
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              );
            })
          : null}
        {loading && <div>Loading...</div>}
      </div>
      <button disabled={products.length >= 100} onClick={onLoadMore}>
        Load more
      </button>
      {products.length >= 100 && <p>No more products to load</p>}
    </div>
  );
};

export default LoadMoreProducts;
