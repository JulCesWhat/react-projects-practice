import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../models/product";
import { Link } from "react-router-dom";
import CartTile from "../components/cart-tile";

const CartPage = () => {
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state?.cart) as IProduct[];

  useEffect(() => {
    setTotalCart(cart.reduce((acc, cur) => acc + cur.price, 0));
  }, [cart]);

  return (
    <div className="">
      {cart && cart.length ? (
        <div className="flex">
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-center p-3">
              {cart.map((product) => (
                <CartTile key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
            <h1 className="font-bold text-lg text-red-800">
              Your cart summary
            </h1>
            <p>
              <span className="text-gray-800 font-bold">Total Item(s)</span>
              <span>: {cart.length}</span>
            </p>
            <p>
              <span className="text-gray-800 font-bold">Total Amount</span>
              <span>: {totalCart}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-800 font-bold text-xl mb-2">
            Your cart is empty
          </h1>
          <Link to={"/"}>
            <button className="bg-red-950 text-white border-2 rounded-lg font-bold p-4">
              Shop now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default CartPage;
