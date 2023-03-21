import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [emailReg, setEmail] = useState("");
  const [confirmPasswordReg, setConfirmPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const signup = () => {
    axios
      .post("http://localhost:3001/signup", {
        username: userNameReg,
        password: passwordReg,
        email: emailReg,
        confirmPassword: confirmPasswordReg,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          console.log("aagya");
          navigate("/");
        } else {
          console.log("nhi aaya");
          setFlag(true);
        }
      });
  };
  return (
    <div className={styles.SignUp}>
      <h1>Register here</h1>
      <label>User Name</label>
      <input
        type="text"
        onChange={(e) => {
          setUserNameReg(e.target.value);
        }}
      />
      <label>Email Address</label>
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
      <label>Confirm Password</label>
      <input
        type="password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      {flag === 1 && <div>Password Wrong</div>}

      <button onClick={signup}>Submit</button>
    </div>
  );
}

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
