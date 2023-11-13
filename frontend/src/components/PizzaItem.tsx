import { Link } from "react-router-dom";
import { Pizza } from "../types/Pizza";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { sendToCartItem } from "../utils";
import { toast } from "react-toastify";

function PizzaItem({ pizza }: { pizza: Pizza }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item: CartItem) => {
    const prevItem = cartItems.find((x) => x._id === pizza._id);
    const quantity = prevItem ? prevItem.quantity + 1 : 1;

    if (pizza.stock < quantity) {
      toast.warn("Sorry, this item is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });

    toast.success("Pizza added to the cart");
  };
  return (
    <div>
      <div className="text-center mb-4 p-3 card showModel">
        <h2 className="fs-5 text-uppercase py-2">{pizza.name}</h2>
        <Link to={`/pizza/${pizza.slug}`}>
          <img src={pizza.image} className="img-fluid w-100" alt={pizza.name} />
        </Link>
        <div className="d-flex justify-content-between mt-3 fs-4">
          <p className="fs-5 fw-semibold mb-2 text-start">
            CA$ {pizza.price}.00
          </p>
          {pizza.stock === 0 ? (
            <a className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 py-1 rounded disabled">
              Out of stock
            </a>
          ) : (
            <a
              onClick={() => addToCartHandler(sendToCartItem(pizza))}
              className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 py-1 rounded"
            >
              Add to Cart
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PizzaItem;
