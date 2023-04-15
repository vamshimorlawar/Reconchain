import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CompanyJobApplication.module.css";
import { useParams } from "react-router-dom";
import CompanyNav from "../CompanyNav/CompanyNav";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CompanyJobApplication = () => {
  const id = useParams().id;
  const block_job_id = useParams().block_job_id;
  const company_email = sessionStorage.getItem("email");

  const [candidateData, setCandidateData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hired, setHired] = useState(false);

  const handleRowSelect = (event) => {
    setSelectedCandidate(event.target.value);
  };

  async function acceptingJobOffer() {
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
        await contract.acceptingJobOffer(block_job_id, ethers.utils.hexlify(candidateData[0].address));
        contract.on(
          "JobApplicationCreated",
          function (address, block_job_id, event) {
            let blockNumber = event.blockNumber;
            if (eventBlocks.has(blockNumber)) return;
            eventBlocks.add(blockNumber);
            if (address) {
              axios
                .post("http://localhost:3001/hireCandidate", {
                  candidate_email: selectedCandidate,
                  company_email: company_email,
                  job_id: id,
                })
                .then((res) => {
                  if (res.data.status === "success") {
                    setSelectedCandidate(res.data.hired);
                    setHired(true);
                    toast.success("Candidate Hired Successfully");
                  }
                });
            }
          }
        );
      } catch (error) {
        toast.error((error.reason));
        console.log("Error is ", (error.reason));
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected row: ", selectedCandidate);
    await acceptingJobOffer();
  };
  const isSubmitDisabled =
    selectedCandidate === null || selectedCandidate === undefined;

  useEffect(() => {
    fetchData();
  }, []);

  // Based on Emails get their details
  const fetchData = async () => {
    const applicants = await axios.post(
      "http://localhost:3001/getJobApplicants",
      {
        id: id,
        email: company_email,
      }
    );

    const applicantsData = applicants.data.result;
    const candidateData = [];
    applicantsData.forEach(async (applicant) => {
      const res = await axios.post(
        "http://localhost:3001/getCandidateProfile",
        { email: applicant.candidate_email }
      );
      candidateData.push(res.data);
      if (candidateData.length === applicantsData.length) {
        setCandidateData(candidateData);
      }
    });

    await axios
      .post("http://localhost:3001/getHiredCandidate", {
        company_email: company_email,
        job_id: id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.result.length > 0) {
            console.log(res.data.result[0].candidate_email);
            setSelectedCandidate(res.data.result[0].candidate_email);
            setHired(true);
          }
        } else {
          console.log("Not Hired Anyone");
        }
      });
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <ToastContainer />
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Company Job Applications</Card.Title>
            <Card.Text>
              <strong>Job ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Block Job ID:</strong> {block_job_id}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {company_email}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="mt-5 mx-5 container">
          <Form onSubmit={handleSubmit}>
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>id</th>
                  <th>username</th>
                  <th>email</th>
                  <th>rating</th>
                  <th>interest</th>
                  <th>education</th>
                  <th>experience</th>
                  <th>skills</th>
                  <th>languages</th>
                  <th>mobile</th>
                  <th>address</th>
                </tr>
              </thead>
              <tbody>
                {candidateData.map((row) => (
                  <tr
                    key={row.id}
                    style={
                      selectedCandidate === row.email
                        ? { backgroundColor: "yellow" }
                        : {}
                    }
                  >
                    <td>
                      <Form.Check
                        type="radio"
                        name="rowSelect"
                        value={row.email}
                        onChange={handleRowSelect}
                        disabled={hired}
                        checked={selectedCandidate === row.email}
                      />
                    </td>
                    <td>{row.id}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.rating}</td>
                    <td>{row.interests}</td>
                    <td>{row.education}</td>
                    <td>{row.experience}</td>
                    <td>{row.skills}</td>
                    <td>{row.languages}</td>
                    <td>{row.mobile}</td>
                    <td>{row.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!hired && (
              <Button
                type="submit"
                className="mt-5"
                disabled={isSubmitDisabled}
              >
                Hire Candidate
              </Button>
            )}
            {hired && (
              <Button variant="success" className="mt-5" disabled>
                Already Hired
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

CompanyJobApplication.propTypes = {};

CompanyJobApplication.defaultProps = {};

export default CompanyJobApplication;