import { Pizza } from "./models/pizzaModel";
import { User } from "./models/userModel";
import bcrypt from "bcryptjs";

export const typePizzas: Pizza[] = [
  {
    name: "Golden Delight",
    slug: "golden-delight",
    price: 8,
    stock: 0,
    category: "nonveg",
    image: "../images/golden-delight.png",
    description:
      "Mmm! Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!",
  },
  {
    name: "Non Veg Supreme",
    slug: "non-veg-supreme",
    price: 7,
    stock: 6,
    category: "nonveg",
    image: "../images/non-veg-supreme.png",
    description:
      "Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers",
  },
  {
    name: "Chicken Sausage",
    slug: "chicken-sausage",
    price: 8,
    stock: 3,
    category: "nonveg",
    description: "Chicken Sausage & Cheese",
    image: "../images/chicken-sausage.png",
  },
  {
    name: "Chicken Pepperoni",
    slug: "chicken-pepperoni",
    price: 7,
    stock: 9,
    category: "nonveg",
    image: "../images/chicken-pepperoni.png",
    description:
      "A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese",
  },
  {
    name: "Chicken Fiesta",
    slug: "chicken-fiesta",
    price: 7,
    stock: 11,
    category: "nonveg",
    image: "../images/chicken-fiesta.png",
    description:
      "Grilled Chicken Rashers I Peri-Peri Chicken I Onion I Capsicum",
  },
  {
    name: "Barbecue Chicken",
    slug: "barbecue-chicken",
    price: 8,
    stock: 2,
    category: "nonveg",
    image: "../images/barbecue-chicken.png",
    description: "Pepper Barbecue Chicken I Cheese",
  },
  {
    name: "Veggie Paradise",
    slug: "veggie-paradise",
    price: 7,
    stock: 10,
    category: "veg",
    image: "../images/veggie-paradise.jpg",
    description: "Goldern Corn, Black Olives, Capsicum & Red Paprika",
  },
  {
    name: "Deluxe Veggie",
    slug: "deluxe-veggie",
    price: 8,
    stock: 12,
    category: "veg",
    image: "../images/deluxe-veggie.jpg",
    description:
      "For a vegetarian looking for a BIG treat that goes easy on the spices, this one's got it all.. The onions, the capsicum, those delectable mushrooms - with paneer and golden corn to top it all",
  },
  {
    name: "Veg Extravaganza",
    slug: "veg-extravaganza",
    price: 7,
    stock: 1,
    category: "veg",
    image: "../images/veg-extravaganza.jpg",
    description:
      "A pizza that decidedly staggers under an overload of golden corn, exotic black olives, crunchy onions, crisp capsicum, succulent mushrooms, juicyfresh tomatoes and jalapeno - with extra cheese to go all around",
  },
  {
    name: "Double Cheese",
    slug: "double-cheese",
    price: 8,
    stock: 13,
    category: "veg",
    image: "../images/double-cheese.jpg",
    description:
      "The ever-popular Margherita - loaded with extra cheese... oodies of it!",
  },
  {
    name: "Margherita",
    slug: "margherita",
    price: 7,
    stock: 6,
    category: "veg",
    image: "../images/margherita.jpg",
    description:
      "A hugely popular margherita, with a deliciously tangy single cheese topping",
  },
  {
    name: "Mexican Wave",
    slug: "mexican-wave",
    price: 8,
    stock: 15,
    category: "veg",
    image: "../images/mexican-wave.jpg",
    description:
      "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs",
  },
];

export const typeUsers: User[] = [
  {
    name: "Gunveet",
    email: "gunveet@pizzashop.com",
    password: bcrypt.hashSync("123"),
    isAdmin: true,
  },
  {
    name: "Rahul",
    email: "rahul@pizzashop.com",
    password: bcrypt.hashSync("123"),
    isAdmin: false,
  },
];
