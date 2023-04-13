import React from "react";
import PropTypes from "prop-types";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Auth = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="text-center mb-1 mt-5" style={{fontWeight: "bolder"}}>
        CS731 Project Group 1
      </div>
      <div>
        Blockchain based recruitment management system
      </div>
      <div className="my-3" style={{fontWeight: "bolder", fontSize: "18px", border: "1px red solid", padding: "10px"}}>RECONCHAIN</div>
      <div style={{fontWeight: "bolder"}}>Team Members</div>
      <div className="mt-1 mb-5">
        Ayush Kothiyal,
        Deepak Mathur,
        Vinay Agrawal,
        Vamshikiran Morlawar
      </div>
      <Row>
        <Col>
          <Link to="login">
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </Link>
        </Col>
        <Col>
          <Link to="signup">
            <button type="button" className="btn btn-warning">
              Signup
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

Auth.propTypes = {};

Auth.defaultProps = {};

export default Auth;
