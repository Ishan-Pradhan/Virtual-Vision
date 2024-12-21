/*eslint-disable*/
import Counter from "../Counter";
import { useCartContext } from "../../context/cartcontext";

function CartProducts({ item }) {
  const { setDecrease, setIncrease, removeItem } = useCartContext();

  const price =
    item.discount > 0
      ? item.price - item.price * (item.discount / 100)
      : item.price;

  return (
    <div
      key={item._id}
      className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center border md:py-8 py-2 px-2 md:px-8 shadow-lg my-8"
    >
      <img src={item.productImg} alt="" className="w-20 border" />
      <div className="col-span-1 w-auto hidden md:flex">{item.name}</div>
      <div className="col-span-1 hidden md:flex">Rs.{price}</div>
      <div className="col-span-1">
        <Counter
          count={item.quantity}
          setIncrease={() => setIncrease(item._id)}
          setDecrease={() => setDecrease(item._id)}
        />
      </div>
      <div className="col-span-1">Rs. {price * item.quantity}</div>
      <button>
        <i
          className="fa-solid fa-trash text-red-500 text-xl hover:text-red-700"
          onClick={() => removeItem(item._id)}
        ></i>
      </button>
    </div>
  );
}

export default CartProducts;
