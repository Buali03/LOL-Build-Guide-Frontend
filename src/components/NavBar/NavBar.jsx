import { Link } from "react-router";
import "./NavBar.css";
import LogoutButton from "../user/logout-button/logout-button";

const NavBar = ({ token, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/user/login" className="nav-link">
        Log in
      </Link>
      <Link to="/user/signup" className="nav-link">
        Sign up
      </Link>
      <LogoutButton className="nav-link" onLogout={onLogout}></LogoutButton>
      <Link to="/lolguides/champions" className="nav-link">
        Champions
      </Link>
      <Link to="/lolguides/new" className="nav-link">
        Create
      </Link>
    </nav>
  );
};

export default NavBar;
