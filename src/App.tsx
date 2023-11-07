// import { useState } from "react";
// import { Modal } from "react-bootstrap";
// import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <header className="fixed-top">
        <nav className="navbar navbar-expand-lg shadow-sm p-3 bg-body">
          <div className="container">
            <a className="navbar-brand fs-3" href="#">
              <span className="fw-bold">Pizza</span>App
            </a>
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
                  <a className="nav-link" aria-current="page" href="#">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Cart
                  </a>
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
