import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CandidateJobApplication.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import CandidateNav from "../CandidateNav/CandidateNav";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CandidateJobApplication = () => {
  const id = useParams().id;
  const company_email = useParams().company_email;

  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .post("http://localhost:3001/getJobPost", {
        id: id,
        email: company_email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setJobData(res.data.posts[0]);
        }
      });
  };

  async function createJobApplication() {
    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );
      try {
        await contract.createJobApplication(
          jobData.block_job_id,
          jobData.address
        );
        contract.on(
          "JobApplicationCreated",
          function (address, block_job_id, company_address, event) {
            let blockNumber = event.blockNumber;
            if (eventBlocks.has(blockNumber)) return;
            eventBlocks.add(blockNumber);
            console.log("Address return - ",address);
            if (address) {
              axios
                .post("http://localhost:3001/createApplicationProfile", {
                  candidate_email: sessionStorage.getItem("email"),
                  company_email: jobData.company_email,
                  job_id: jobData.id,
                })
                .then((res) => {
                  if (res.data.status === "success") {
                    console.log("Profile updated");
                    toast.success("Application Submitted");
                  } else {
                    console.log("Update Failed");
                    toast.error("Application Submission Failed")
                  }
                });
            }
          }
        );
      } catch (error) {
        toast.error(regex.exec(error.reason)[1]);
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  };

  const createApplication = async (event) => {
    event.preventDefault();
    await createJobApplication();
  };

  if (!jobData) {
    return <div>Loading ...</div>;
  };

  return (
    <div>
      <CandidateNav></CandidateNav>
      <ToastContainer/>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">{jobData.title}</h2>
            <p className="text-muted text-center">
              {jobData.location} | {jobData.type}
            </p>
            <hr />
            <p className="text-justify">{jobData.description}</p>
            <hr />
            <p>Salary: ${jobData.salary} per year</p>
            <p>Tags: {jobData.tag}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <hr />
            <h4>Apply for this job</h4>
            <Form onSubmit={createApplication}>
              <Form.Group controlId="formFile">
                <Form.Label>Upload your resume</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-5">
                Confirm Application
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CandidateJobApplication.propTypes = {};

CandidateJobApplication.defaultProps = {};

export default CandidateJobApplication;
