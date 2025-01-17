import { Link, useLocation } from "react-router-dom";


function Nav() {
  const currentPage = useLocation().pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"></Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={
                  currentPage === "/"
                    ? "nav-link active bg-primary-subtle"
                    : "nav-link"
                }
              >
            
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Portfolio"
                className={
                  currentPage === "/Portfolio"
                    ? "nav-link active bg-primary-subtle"
                    : "nav-link"
                }
              >
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contact"
                className={
                  currentPage === "/Contact"
                    ? "nav-link active bg-primary-subtle"
                    : "nav-link"
                }
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Resume"
                className={
                  currentPage === "/Resume"
                    ? "nav-link active bg-primary-subtle"
                    : "nav-link"
                }
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
