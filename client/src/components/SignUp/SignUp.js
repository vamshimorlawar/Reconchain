import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Signup.module.css";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";

// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("candidate"); // default value is "candidate"
  // const [address, setAddress] = useState("");

  async function createCandidateProfile() {
    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );
      try {
        await contract.createCandidateProfile(username, email);
        contract.on("CandidateProfileCreated", function (address, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Candidate Address", address);
          console.log("Address inside submit", address);
          axios
            .post("http://localhost:3001/signup", {
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              userType: userType,
              address: address
            })
            .then((res) => {
              if (res.data.status === "success") {
                navigate("/login");
              } else {
                console.log("Signup Failed");
              }
            });
        });
      } catch (error) {
        toast.error(regex.exec(error.reason)[1]);
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  }

  async function createCompanyProfile() {
    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );

      try {
        await contract.createCompanyProfile(username, email);
        contract.on("CompanyProfileCreated", function (address, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Company Address", address);
          axios
            .post("http://localhost:3001/signup", {
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              userType: userType,
              address: address
            })
            .then((res) => {
              if (res.data.status === "success") {
                navigate("/login");
              } else {
                console.log("Signup Failed");
              }
            });
        });
      } catch (error) {
        toast.error(regex.exec(error.reason)[1]);
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from reloading the page
    // add code to submit the form data to the server
    if (userType === "candidate") {
      await createCandidateProfile();
    }
    if (userType === "company") {
      await createCompanyProfile();
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
      <ToastContainer />
      <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
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

        <Button variant="primary" type="submit" className="mt-3">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
