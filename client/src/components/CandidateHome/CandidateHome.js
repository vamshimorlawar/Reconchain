import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './CandidateHome.module.css';
import CandidateJobCard from "../CandidateJobCard/CandidateJobCard";
import CandidateNav from '../CandidateNav/CandidateNav';
import axios from "axios";
import { ToastContainer } from "react-bootstrap";
/*
const CandidateHome = () => {
  const [jobData, setJobData] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getUnappliedJobs", {candidate_email:email});
    setJobData(res.data.posts);
  };
  if (jobData) {
    const postItems = [];
    // jobData.forEach((job) => {
    for (const job of jobData) {  
      // const res2 = await axios.post("http://localhost:3001/getJobReportFlag",{candidate_email:email, job_id:job.id});      
      postItems.push(
        <CandidateJobCard
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          email={job.company_email}
          report={job.report}
          // report_flag = {res2.data.report_flag}
        />
      );
      console.log(postItems.length, jobData.length);
      
    }
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
*/

const CandidateHome = () => {
  const [jobData, setJobData] = useState(null);
  const [postItems, setPostItems] = useState([]);

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post("http://localhost:3001/getUnappliedJobs", {candidate_email:email});
        setJobData(res.data.posts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function postData() {
      try {
        const newPostItems = [];
        if (jobData) {
        for (const job of jobData) {
          const res2 = await axios.post("http://localhost:3001/getJobReportFlag",{candidate_email:email, job_id:job.id});      
          const reportFlag = res2.data.report_flag;
          newPostItems.push(
            <CandidateJobCard
              key={job.id}
              id={job.id}
              title={job.title}
              description={job.description}
              location={job.location}
              email={job.company_email}
              report={job.report}
              report_flag={reportFlag}
            />
          );
        }
      }
        setPostItems(newPostItems);
      } catch (error) {
        console.error(error);
      }
    }

      postData();
  }, [jobData]);

  return (
    <div>
      <CandidateNav></CandidateNav>
      <ToastContainer/>
      <div>{postItems}</div>
    </div>
  );
};
CandidateHome.propTypes = {};

CandidateHome.defaultProps = {};

export default CandidateHome;
