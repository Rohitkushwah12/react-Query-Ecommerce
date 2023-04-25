import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  const loginUser = localStorage.getItem("userAuth");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {loginUser ? (
        <div>
          <span className="logo">REACT STORE</span>

          <Link className="navLink" to="/">
            Home
          </Link>
          <Link className="navLink" to="/cart">
            Cart
          </Link>
          <Link className="navLink" to="/profile">
            Profile
          </Link>
          <button className="logout-button" onClick={handleClick}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
