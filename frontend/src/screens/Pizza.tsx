import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPizzaDetailsBySlugQuery } from "../hooks/pizzaHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { sendToCartItem, getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

export default function Pizza() {
  const params = useParams();
  const { slug } = params;
  const {
    data: pizza,
    isLoading,
    error,
  } = useGetPizzaDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const prevItem = cart.cartItems.find((x) => x._id === pizza!._id);
    const quantity = prevItem ? prevItem.quantity + 1 : 1;

    if (pizza!.stock < quantity) {
      toast.warn("Sorry, Item is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...sendToCartItem(pizza!), quantity },
    });

    toast.success("Pizza added to the cart");
    navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !pizza ? (
    <MessageBox variant="danger">Not Found</MessageBox>
  ) : (
    <div className="details-container">
      <Helmet>
        <title>Pizza | PizzaShop</title>
      </Helmet>
      <div className="text-center mb-4 p-4 mt-5 card details-card">
        <div className="row">
          <div className="container d-flex justify-content-between fs-4">
            <div className="col-md-3">
              <img src={pizza.image} alt={pizza.name} />
            </div>
            <div className="col-md-9 text-start ms-0">
              <h2>{pizza.name}</h2>
              <p>CA$ {pizza.price}.00</p>
              <div className="mb-2">
                {pizza.stock > 0 ? (
                  <span className="fs-6 bg-success text-white px-3 py-1 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="fs-6 bg-danger text-white px-3 py-1 rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              <p>
                {pizza.stock > 0 && (
                  <a
                    onClick={addToCartHandler}
                    className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </a>
                )}
              </p>
              <p>{pizza.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
