import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavText } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import styles from "./CandidateNav.module.css";
import { useNavigate } from "react-router-dom";

const CandidateNav = () => {
  const navigate = useNavigate();
  function logout() {
    console.log("Logging out");
    sessionStorage.clear();
    navigate("/");
  }
  const email = sessionStorage.getItem("email");
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Navbar.Brand href="#home">Reconchain_Candidate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/candidate-home">Home</Nav.Link>
          <Nav.Link href="#applied">Applied</Nav.Link>
          <Nav.Link href="/candidate-profile">Profile</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="justify-content-end">
        <Nav.Item>
          <span className="navbar-text text-warning">{email}</span>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

CandidateNav.propTypes = {};

CandidateNav.defaultProps = {};

export default CandidateNav;
