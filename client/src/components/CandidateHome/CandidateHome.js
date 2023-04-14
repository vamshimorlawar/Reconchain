import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './CandidateHome.module.css';
import CandidateJobCard from "../CandidateJobCard/CandidateJobCard";
import CandidateNav from '../CandidateNav/CandidateNav';
import axios from "axios";
import { ToastContainer } from "react-bootstrap";

const CandidateHome = () => {
  const [jobData, setJobData] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/getJobPosts");
    setJobData(res.data.posts);
  };
  if (jobData) {
    const postItems = [];
    jobData.forEach((job) => {
      postItems.push(
        <CandidateJobCard
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          email={job.company_email}
        />
      );
    });
    return (
      <div>
        <CandidateNav></CandidateNav>
        <ToastContainer/>
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

CandidateHome.propTypes = {};

CandidateHome.defaultProps = {};

export default CandidateHome;
