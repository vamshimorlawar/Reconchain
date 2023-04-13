import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("candidate"); // default value is "candidate"

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from reloading the page
    // add code to submit the form data to the server
    axios.post("http://localhost:3001/signup", {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userType: userType
    }).then((res) => {
      if(res.data.status === "success"){
        navigate("/login");
      }else{
        console.log("Signup Failed");
      }
    })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formUserType">
        <Form.Label>User Type</Form.Label>
        <Form.Control
          as="select"
          value={userType}
          onChange={(event) => setUserType(event.target.value)}
        >
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
