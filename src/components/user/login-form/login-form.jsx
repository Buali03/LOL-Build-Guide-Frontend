import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Backend_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${Backend_URL}/user/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
      navigate("/lolguides/champions");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="main-content">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
