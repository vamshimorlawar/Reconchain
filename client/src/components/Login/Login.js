import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email} Password: ${password}`);
    // You can add your own logic here for handling the login form submission
    axios.post("http://localhost:3001/login", {
      email: email,
      password: password
    }).then((res) => {
      if(res.data.status === "success"){
        console.log("Login Successful");
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("email", email);
        navigate(res.data.location)
      }else{
        console.log("Login Failed");
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
