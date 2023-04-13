import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CompanyHome.module.css";
import axios from "axios";
import CompanyNav from "../CompanyNav/CompanyNav";
import CompanyJobCard from "../CompanyJobCard/CompanyJobCard";

const CompanyHome = () => {
  const [jobData, setJobData] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getJobPosts", {
      email: email,
    });
    setJobData(res.data.posts);
  };
  if (jobData) {
    const postItems = [];
    jobData.forEach((job) => {
      postItems.push(
        <CompanyJobCard
          key={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
        />
      );
    });
    return (
      <div>
        <CompanyNav></CompanyNav>
        <Link to="/company-job-post">
          <button className="btn btn-warning">Add Job Post</button>
        </Link>
        <div>{postItems}</div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading Job Posts...</p>
      </div>
    );
  }
};

CompanyHome.propTypes = {};

CompanyHome.defaultProps = {};

export default CompanyHome;
