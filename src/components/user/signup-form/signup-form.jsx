import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../login-form/login-form.css";

const Backend_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${Backend_URL}/user/signup`, {
        username,
        password,
      });
      alert("User registered, please login");
      navigate("/user/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="main-content">
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login">Sign Up</h2>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUpForm;
