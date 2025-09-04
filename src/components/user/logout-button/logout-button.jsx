import { Link } from "react-router";

function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    console.log("logged out success");
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <Link to="user/login" className="nav-link" onClick={handleLogout}>
      Logout
    </Link>
  );
}

export default LogoutButton;
