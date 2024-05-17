import { useDispatch } from "react-redux";

import { removeFromCart } from "../../store/slices/cart-slice";

import { IProduct } from "../../models/product";

const CartTile = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex items-center p-5 justify-between bg-red-500 mt-2 mb-2 rounded-xl flex-col">
      <div className="flex p-3">
        <img
          src={product.image}
          alt={product.title}
          className="h-28 rounded-lg"
        />
        <div className="flex flex-col ml-5">
          <h1 className="text-white font-bold text-lg">{product.title}</h1>
          <p className="text-white">{product.description}</p>
          <p className="text-white">{product.price}</p>
        </div>
      </div>
      <button
        className="bg-red-950 text-white border-2 rounded-lg font-bold p-4"
        onClick={handleRemoveFromCart}
      >
        Remove from Cart
      </button>
    </div>
  );
};

export default CartTile;
