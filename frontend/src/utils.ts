import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Pizza } from "./types/Pizza";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const sendToCartItem = (pizza: Pizza): CartItem => {
  const cartItem: CartItem = {
    _id: pizza._id,
    image: pizza.image,
    name: pizza.name,
    slug: pizza.slug,
    quantity: 1,
    stock: pizza.stock,
    price: pizza.price,
  };
  return cartItem;
};
