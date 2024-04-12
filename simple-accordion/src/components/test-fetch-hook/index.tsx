import useFetch, {ActionType} from "../../hooks/useFetch";

const TestFetchHooks = () => {
  const { data, error, status } = useFetch(
    "https://dummyjson.com/products",
    undefined
  );

  if (status === ActionType.LOADING) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return <div>
    {data?.products && Array.isArray(data?.products) && data?.products?.map((product: any) => (
      <div key={product.id}>{product.title}</div>
    ))}
  </div>; 
};

export default TestFetchHooks;
