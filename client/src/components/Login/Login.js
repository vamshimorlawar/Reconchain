import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailReg, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () =>
    axios
      .post("http://localhost:3001/login", {
        email: emailReg,
        password: passwordReg,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          navigate("/home");
        }
      });
  return (
    <div className={styles.Login}>
      <h1>Login</h1>
      <label> Email</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Submit</button>
    </div>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
