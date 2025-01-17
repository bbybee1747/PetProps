import { Link, useLocation } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <nav>
      <div>
        <Link to="/"></Link>

        <div>
          <ul>
            <li>
              <Link to="/"></Link>
            </li>
            <li>
              <Link to="/Portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/Resume">Resume</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
