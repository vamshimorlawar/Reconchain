import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CandidateJobsApplied.module.css';
import CandidateNav from '../CandidateNav/CandidateNav';
import CandidateJobCard from "../CandidateJobCard/CandidateJobCard";

import axios from "axios";
import { ToastContainer } from "react-bootstrap";



const CandidateJobsApplied = () => {
  const [jobData, setJobData] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getAppliedJobs", {email:email});
    console.log(res.data);
    setJobData(res.data.posts);
  };

  if (jobData) {
    const postItems = [];
    jobData.forEach((job) => {
      postItems.push(
        <CandidateJobCard
          key={job[0].id}
          id={job[0].id}
          title={job[0].title}
          description={job[0].description}
          location={job[0].location}
          email={job[0].company_email}
          report={job[0].report}
          hideApply={true}
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
CandidateJobsApplied.propTypes = {};

CandidateJobsApplied.defaultProps = {};

export default CandidateJobsApplied;
