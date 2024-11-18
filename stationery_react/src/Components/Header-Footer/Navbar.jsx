import React, { useContext, useState } from "react";
import "./HFstyles.css";
import { BiMenu, BiStore, BiX } from "react-icons/bi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const FPATH = process.env.REACT_APP_PATH;
  const [toggle, setToggle] = useState(true);
  const { user, logged } = useContext(AppContext);
  return (
    <nav className="nav navbar-expand-lg d-flex shadow-sm justify-content-between">
      <h1 className="px-4 col-4">
        <Link to={`${FPATH}/`} className="btn btn-outline-dark">
          <BiStore />
          Store
        </Link>
      </h1>
      {logged ? (
        <div className="btn-group pe-2">
          <button type="button" className="btn btn-name">
            <CgProfile className="fs-4 me-1" />
            {user.name}
          </button>
          <button
            type="button"
            className="btn btn-drop dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>

          <ul className="dropdown-menu bg-dark">
            <li className="dropdown-item">
              <Link
                className="dropdown-item"
                to={`${FPATH}/cart`}
                activeclassname="active-link"
              >
                Cart
              </Link>
            </li>
            <li className="dropdown-item">
              <Link
                className="dropdown-item"
                to={`${FPATH}/orders`}
                activeclassname="active-link"
              >
                Orders
              </Link>
            </li>
            <li className="dropdown-item">
              <Link
                className="dropdown-item"
                to={`${FPATH}/logout`}
                activeclassname="active-link"
              >
                Logout <LuLogOut />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          {toggle ? (
            <button
              type="button"
              className="navbar-toggler fs-2 bg-dark p-1 me-3 rounded-2 toggle"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setToggle(!toggle)}
            >
              <BiMenu />
            </button>
          ) : (
            <button
              type="button"
              className="navbar-toggler fs-2 bg-dark p-1 me-3 rounded-2 toggle"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setToggle(!toggle)}
            >
              <BiX />
            </button>
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex justify-content-end w-100">
              <ul className="navbar-nav pe-lg-4 ms-4 pe-3 w-50 w-md-75 d-flex justify-content-between ">
                <li className="nav-item">
                  <Link
                    to={`${FPATH}/admin`}
                    className="link nav-link"
                    activeclassname="active-link"
                  >
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`${FPATH}/cart`}
                    className="nav-link"
                    activeclassname="l"
                  >
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`${FPATH}/orders`}
                    className="nav-link"
                    activeclassname="active-link"
                  >
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`${FPATH}/login`}
                    className="link nav-link"
                    activeclassname="active-link"
                  >
                    Login
                    <LuLogIn />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
