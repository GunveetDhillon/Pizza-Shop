import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { Badge, Button, NavDropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <>
      <header className="fixed-top">
        <ToastContainer position="top-right" autoClose={2000} limit={1} />
        <nav className="navbar navbar-expand-lg shadow-sm p-3 bg-body">
          <div className="container">
            <LinkContainer to="/">
              <a className="navbar-brand fs-3" href="#">
                <span className="fw-bold">Pizza</span>Shop
              </a>
            </LinkContainer>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Button
                    variant={mode}
                    onClick={switchModeHandler}
                    className="nav-link bg-transparent"
                    href="#"
                  >
                    <i
                      className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                    ></i>
                  </Button>
                </li>
                <li className="nav-item ms-2">
                  <Link to="/cart" className="nav-link">
                    <i className="fa fa-shopping-cart"></i>{" "}
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger" className="cartBadge">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <Link
                        to="#signout"
                        onClick={signoutHandler}
                        className="dropdown-item"
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link to="/signin" className="nav-link">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-5">
        <div className="container pt-5">
          <Outlet />
        </div>
      </main>
      <footer>
        <div className="text-center py-4">
          Copyright &copy;{" "}
          <a className="text-decoration-none fw-bold link-color" href="#">
            PizzaShop
          </a>{" "}
          | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default App;
