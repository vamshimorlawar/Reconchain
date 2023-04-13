import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavText } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import styles from './CandidateNav.module.css';
import { useNavigate } from 'react-router-dom';

const CandidateNav = () =>{
  const navigate = useNavigate();
  function logout() {
    console.log('Logging out');
    sessionStorage.clear();
    navigate("/");
  }
  const email = sessionStorage.getItem("email");
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Reconchain_Candidate</Navbar.Brand>
      <Nav className="ml-auto">
          <Nav.Item>
            <span className="navbar-text">{email}</span>
          </Nav.Item>
        </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/candidate-home">Home</Nav.Link>
          <Nav.Link href="#applied">Applied</Nav.Link>
          <Nav.Link href="/candidate-profile">Profile</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


CandidateNav.propTypes = {};

CandidateNav.defaultProps = {};

export default CandidateNav;
