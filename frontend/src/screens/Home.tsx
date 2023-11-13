import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PizzaItem from "../components/PizzaItem";
import { Helmet } from "react-helmet-async";
import { useGetPizzasQuery } from "../hooks/pizzaHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function Home() {
  const { data: pizzas, isLoading, error } = useGetPizzasQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <div className="row pt-5">
      <Helmet>
        <title>Home Page | PizzaShop</title>
      </Helmet>
      {pizzas!.map((pizza) => (
        <div key={pizza.slug} className="col-md-6 col-lg-4">
          <PizzaItem pizza={pizza} />
        </div>
      ))}
    </div>
  );
}
