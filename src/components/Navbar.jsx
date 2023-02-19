import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logo} width="30" height="30" alt="" />
      </Link>
      <Link to="/" className="navbar-brand">
        MERN-Stack Crud App
      </Link>
      <div className="collpase nav-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Contacts
            </Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/category" className="nav-link">
              Category
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
