import axios from "axios";
import React from "react";
import { AppContext } from "../../context";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const FPATH = process.env.REACT_APP_PATH;
  const BPATH = process.env.REACT_APP_BACKEND_APP_PATH;
  const Navigate = useNavigate();
  const [error, setError] = React.useState("");
  const { users, user, setUser, setLogged } = React.useContext(AppContext);
  const HandleLogin = async () => {
    try {
      await axios
        .post(`${BPATH}/admin/login`, user)
        .then((res) => {
          console.log(res.status);
          setLogged(true);
          const current_user = users.find((u) => u.email === user.email);
          setUser((prev) => ({
            ...prev,
            name: current_user.name,
            role: "admin",
          }));
          localStorage.setItem("token", res.data.token);
          Navigate(`${FPATH}/admin/upload`);
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.data &&
            err.response.data.message === "User not found"
          ) {
            console.log("User role not matching");
            setError("User is not an admin");
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="card border-0 rounded-0 py-5 login">
      <h1 className="card-title text-center fw-bolder m-3">Sign in</h1>
      <h6 className="text-sm-center">Admin Panel</h6>
      <div className="card-body d-flex justify-content-center align-items-center flex-column my-1">
        {error && (
          <span className="alert alert-danger p-1 px-2" role="alert">
            {error}
          </span>
        )}
        <p className="my-3">
          <label htmlFor="email" className="label form-label d-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </p>
        <p className="mt-3">
          <label htmlFor="password" className="label form-label d-block">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, pass: e.target.value }))
            }
          />
        </p>
        <p className="m-0">
          <button
            type="button"
            className="btn btn-outline w-100 fw-bold"
            onClick={HandleLogin}
          >
            Login
          </button>
        </p>
        {/* 
        <h6 className="fw-bold m-0">
          Create an account ??{" "}
          <Link
            className="link link-danger link-offset-1-hover px-2 fw-bold link-underline-opacity-0-hover"
            to={`${FPATH}/register`}
          >
            Sign up
          </Link>
        </h6> */}
      </div>
    </Container>
  );
};

export default Login;
