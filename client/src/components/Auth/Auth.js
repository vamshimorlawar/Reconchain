import React from "react";
import PropTypes from "prop-types";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

const Auth = () => (
  <div>
    <div>
      <Link to="login">
        <button type="button" className="btn btn-primary">
          Login
        </button>
      </Link>

      <Link to="signup">
        <button type="button" className="btn btn-warning">
          Signup
        </button>
      </Link>
    </div>
  </div>
);

Auth.propTypes = {};

Auth.defaultProps = {};

export default Auth;
