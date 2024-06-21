import React, { useState } from "react";
import axios from "axios";
import "../../css/login.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigage = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      setEmail("");
      setPassword("");
      console.log("response data", response);
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast.success(response?.data?.message || "Login successfully");
      navigage("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Failed to login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="register-link">
          Not registered yet? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
