import { Link } from "react-router-dom";
import { typePizzas } from "../data";

export default function Home() {
  return (
    <div className="row pt-5">
      {typePizzas.map((pizza) => (
        <div key={pizza.slug} className="col-md-6 col-lg-4">
          <Link to={"/pizza/" + pizza.slug}>
            <div>
              <div className="text-center mb-4 p-3 card showModel">
                <h2 className="fs-5 text-dark text-uppercase py-2">
                  {pizza.name}
                </h2>
                <img
                  src={pizza.image}
                  className="img-fluid w-100"
                  alt={pizza.name}
                />
                {/* <h2 className="fs-5 text-dark text-uppercase py-2">
              {pizza.name}
            </h2> */}
                <div className="d-flex justify-content-between mt-3 fs-4">
                  <p className="fs-5 fw-semibold mb-2 text-start">
                    CA$
                    {pizza.price}
                  </p>
                  <a className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 py-1 rounded">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
