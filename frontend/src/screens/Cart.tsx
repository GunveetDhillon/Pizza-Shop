import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { Helmet } from "react-helmet-async";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Cart() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    navigate("/signin?redirect=/");
  };
  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    if (item.stock < quantity) {
      toast.warn("Sorry, Item is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = async (item: CartItem) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <div className="cart-container">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Cart</h1>
      <div className="text-center mb-4 p-4 mt-5 card details-card">
        <div className="row">
          <div className="container d-flex justify-content-between fs-4">
            <div className="col-md-8">
              {cartItems.length === 0 ? (
                <div role="alert" className="alert alert-light show">
                  <h2 className="fs-5 mb-0">
                    Cart is empty{" "}
                    <Link className="link-color" to="/">
                      Go Shopping
                    </Link>
                  </h2>
                </div>
              ) : (
                <ListGroup>
                  {cartItems.map((item: CartItem) => (
                    <ListGroup.Item key={item._id}>
                      <div className="row">
                        <div className="container d-flex justify-content-between align-items-center fs-4 ps-1">
                          <div className="col-md-4 d-flex align-items-center">
                            <img
                              src={item.image}
                              className="img-fluid thumbnail rounded"
                              alt={item.name}
                            />
                            <Link to={`/pizza/${item.slug}`}>
                              <h2 className="fs-5 ps-3 link-color">
                                {item.name}
                              </h2>
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <Button
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                              className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-dark text-white px-3 py-1 rounded"
                              variant={mode}
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>{" "}
                            <span>{item.quantity}</span>{" "}
                            <Button
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                              className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-dark text-white px-3 py-1 rounded"
                              variant={mode}
                              disabled={item.quantity === item.stock}
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </div>
                          <div className="col-md-3">
                            <h2 className="fs-5 text-uppercase py-2">
                              CA$ {item.price}.00
                            </h2>
                          </div>
                          <div className="col-md-2">
                            <Button
                              onClick={() => removeItemHandler(item)}
                              variant={mode}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
            <div className="col-md-4">
              <h2 className="fs-5 text-uppercase py-2">
                Sub Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                items): CA${" "}
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}.00
              </h2>
              <Button
                variant="mode"
                onClick={handleShow}
                className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 py-1 rounded"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header className="border-1" closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center mb-3">
                    <i
                      className="fa fa-check-circle"
                      style={{
                        fontSize: 90,
                        color: "green",
                      }}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <h2 className="fs-4 text-center mb-4">
                    Order Placed Successfully
                  </h2>
                  <p className="text-center">
                    Thanks for your order. We've recieved your order & will
                    begin processing it soon.
                  </p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <Button
                    variant="mode"
                    onClick={handleClose}
                    className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 pb-2 rounded"
                  >
                    THANKS
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
