import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSigninMutation } from "../hooks/userHooks";
import { ApiError } from "../types/ApiError";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";

export default function Signin() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isLoading } = useSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const data = await signin({
        email,
        password,
      });

      dispatch({
        type: "USER_SIGNIN",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="signin-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="mt-5 mb-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          {/* <Button disabled={isLoading} type="submit">
            Sign In
          </Button> */}
          <Button
            disabled={isLoading}
            type="submit"
            className="btn fs-6 fw-semibold text-decoration-none mb-2 text-end bg-danger text-white px-3 pb-2 border-0 rounded btn btn-mode"
          >
            Sign In
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link className="link-color" to={`/signup?redirect=${redirect}`}>
            Create Account
          </Link>
        </div>
      </Form>
    </Container>
  );
}
