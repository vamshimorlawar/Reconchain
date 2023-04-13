import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import styles from "./CompanyHome.module.css";
import CompanyNav from "../CompanyNav/CompanyNav";

const CompanyHome = () => (
  <div>
    <CompanyNav></CompanyNav>
    <Link to="/company-job-post">
      <button className="btn btn-warning">Add Job Post</button>
    </Link>
  </div>
);

CompanyHome.propTypes = {};

CompanyHome.defaultProps = {};

export default CompanyHome;
