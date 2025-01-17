import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div>
        <Link to="/">Pet Adoption App</Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pet-list">Pet List</Link>
          </li>
          <li>
            <Link to="/adoption-form">Adoption Form</Link>
          </li>
          <li>
            <Link to="/user-profile">User Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
