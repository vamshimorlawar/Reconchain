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
        <div>
          <Link to="/company-job-post">
            <div className="p-3"
              style={{
                backgroundColor: "white",
                width: "100%",
                position: "sticky",
                top: "50px",
                zIndex: "1",
              }}
            >
              <button className="btn btn-warning mx-3">
                Add New Job Post
              </button>
            </div>
          </Link>
          <div>{postItems}</div>
        </div>
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
