export type CartItem = {
  _id: string;
  image: string | undefined;
  name: string;
  slug: string;
  quantity: number;
  stock: number;
  price: number;
};

export type Cart = {
  cartItems: CartItem[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
};
