import { Link } from "react-router";
import "./NavBar.css";
import LogoutButton from "../user/logout-button/logout-button";

const NavBar = ({ token, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="hexcraft-logo">
        <Link to="/">HexCraft</Link>
      </div>
      {token ? (
        <>
          <Link to="/lolguides/champions" className="nav-link">
            Champions
          </Link>
          <Link to="/lolguides/new" className="nav-link">
            Create
          </Link>
          <Link to="/lolguides" className="nav-link">
            Guides
          </Link>
          <LogoutButton className="nav-link" onLogout={onLogout}></LogoutButton>
        </>
      ) : (
        <>
          <Link to="/user/login" className="nav-login-link">
            Log in
          </Link>
          <Link to="/user/signup" className="nav-login-link">
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
