import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-black px-5">
        <Link className="navbar-brand text-white" to="/home">
          Restaurant Crud
        </Link>
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
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">
                Home
              </Link>
            </li>
            {auth.isLoggedin() ? (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link text-white" to="/restaurants">
                    Restaurants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dishes">
                    Dishes
                  </Link>
                </li> */}
              </>
            ) : (
              " "
            )}
          </ul>
          {!auth.isLoggedin() ? (
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <span className="nav-link mx-4 text-white">{`Hello ${
                  auth.getUser().name
                }`}</span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/login"
                  onClick={() => auth.logout()}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
