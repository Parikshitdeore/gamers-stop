import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import "./login.css";
import { useData } from "../../context/ContextProvider";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { performLogin } = useAuth();
  const { setTitle } = useData();

  useEffect(() => setTitle("Login"));

  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h2>Login</h2>
          <label>
            <p>Email</p>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Parikshit@gmail.com"
            />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="8-12 char"
            />
          </label>
        </div>
        <button
          onClick={() => {
            performLogin(email, password);
          }}
        >
          Login
        </button>
        <p
          className="set-credentials"
          onClick={() => {
            setEmail("Parikshitdeore@gmail.com");
            setPassword("parikshitdeore");
          }}
        >
          Set Test Credentials
        </p>
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  );
}
