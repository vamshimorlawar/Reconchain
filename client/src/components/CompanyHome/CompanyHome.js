import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CompanyHome.module.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import CompanyNav from "../CompanyNav/CompanyNav";
import CompanyJobCard from "../CompanyJobCard/CompanyJobCard";

const CompanyHome = () => {
  const [jobData, setJobData] = useState(null);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

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
    toast.success("Jobs fetched successfully")
    const postItems = [];
    jobData.forEach((job) => {
      postItems.push(
        <CompanyJobCard
          key={job.id}
          id = {job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          block_job_id={job.block_job_id}
        />
      );
    });

    const addJobPost = ()=>{
      axios.post("http://localhost:3001/numberCompanyJobPosts", {email: email}).then((res)=>{
        if (res.data.status === "success") {
          if(res.data.count < 10){
            navigate('/company-job-post');
          }else{
            toast.error("You've reached MAX JOB POSTS");
          } 
        }
      });
      
    }
    return (
      <div>
        <CompanyNav></CompanyNav>
        <ToastContainer/>
        <div>
          {/* <Link to="/company-job-post"> */}
            <div className="p-3"
              style={{
                backgroundColor: "white",
                width: "100%",
                position: "sticky",
                top: "50px",
                zIndex: "1",
              }}
            >
              <button className="btn btn-warning mx-3" onClick={addJobPost}>
                Add New Job Post
              </button>
            </div>
          {/* </Link> */}
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
