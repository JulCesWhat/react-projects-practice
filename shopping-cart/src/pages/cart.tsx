import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../models/product";

const CartPage = () => {
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state?.cart) as IProduct[];

  useEffect(() => {
    setTotalCart(cart.reduce((acc, cur) => acc + cur.price, 0));
  }, [cart]);
  
  return <div>CartPage</div>;
};
export default CartPage;
