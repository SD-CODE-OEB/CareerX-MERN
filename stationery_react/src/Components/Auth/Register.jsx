import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Container from "../Container";
import axios from "axios";

const Register = (props) => {
  const FPATH = process.env.REACT_APP_PATH;
  const BPATH = process.env.REACT_APP_BACKEND_APP_PATH;
  const Navigate = useNavigate();
  const { user, setUser, users } = useContext(AppContext);
  const [res, setRes] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    const validationErrors = {};
    if (user.name.trim() === "") {
      validationErrors.name = "Name is required";
    } else if (users.find((u) => u.name === user.name)) {
      validationErrors.name = "User Already Exists";
    }
    if (user.email.trim() === "" || !user.email.includes("@")) {
      validationErrors.email = "Enter a valid email";
    } else if (users.find((u) => u.email === user.email)) {
      validationErrors.email = "Email already exists";
    }
    if (user.password.trim() === "") {
      validationErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    if (Object.keys(validationErrors).length <= 0) {
      setRes("User Registered Successfully");
      setErrors({});
      user.role = "student";
      await axios
        .post(`${BPATH}/users/signup`, user)
        .then(() => {
          console.log("updaloaded user");
          Navigate(`${FPATH}/login`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container className="register card border-0 rounded-0">
      <h1 className="card-title text-center fw-bolder mt-3">Sign up</h1>
      {res === "" ? (
        <></>
      ) : (
        <p className="fs-5 fw-bold text-decoration-underline text-center pt-2">
          {res}
        </p>
      )}
      <div className="card-body d-flex justify-content-center align-items-center flex-column m-auto">
        <p className="d-flex flex-column m-auto">
          <label htmlFor="name" className="label form-label d-block">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          {errors.name && (
            <span className="opacity-75" style={{ color: "red" }}>
              {errors.name}
            </span>
          )}
        </p>
        <p className="d-flex flex-column m-auto">
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
            required
          />
          {errors.email && (
            <span className="opacity-75" style={{ color: "red" }}>
              {errors.email}
            </span>
          )}
        </p>
        <p className="d-flex flex-column justify-content-center m-auto">
          <label
            htmlFor="password"
            className="label pwd-label form-label d-block align-self-center"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input align-self-center"
            placeholder="Enter Password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, pass: e.target.value }))
            }
            required
          />
          {errors.password && (
            <span className="opacity-75" style={{ color: "red" }}>
              {errors.password}
            </span>
          )}
        </p>
        <p className="my-2">
          <button
            type="button"
            className="btn btn-outline w-100 fw-bold"
            onClick={handleSubmit}
          >
            Register
          </button>
        </p>
        <h6 className="fw-bold">
          Already a user ?{" "}
          <Link
            className="link link-danger link-offset-1-hover px-2 fw-bold link-underline-opacity-0-hover"
            to={`${FPATH}/login`}
          >
            Sign in
          </Link>
        </h6>
      </div>
    </Container>
  );
};

export default Register;
