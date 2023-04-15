import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyJobCard.module.css";
import jobImage from "../../images/job.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CompanyJobCard = (props) => {
  const id = props.id;
  const title = props.title;
  const description = props.description;
  const location = props.location;
  const block_job_id = props.block_job_id;
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const updateJob = () => {
    navigate(`/company-update-job-post/${id}`);
  };

  async function deleteJobPosting() {
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
        console.log("Formadata block job id", block_job_id);
        await contract.deleteJobPosting(block_job_id);
        contract.on(
          "JobPostingDeleted",
          function (address, block_job_id, event) {
            let blockNumber = event.blockNumber;
            if (eventBlocks.has(blockNumber)) return;
            eventBlocks.add(blockNumber);

            console.log("Result Company Address", address, block_job_id);
            console.log("Address inside submit", address, block_job_id);
            if (address) {
              axios
                .post("http://localhost:3001/deleteJob", { id: id })
                .then((res) => {
                  if (res.data.status === "success") {
                    console.log("Job Deleted Succesfully");
                    toast.success("Job Deleted Successfully", {
                      autoClose: 1999,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  } else {
                    console.log("Job Delete Failed");
                    toast.error("Job Delete Failed");
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
  }
  const deleteJob = async () => {
    await deleteJobPosting();
  };

  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if password is correct here
    if (password === "ADMIN") {
      setIsPasswordCorrect(true);
      navigate(`/company-job-applicants/${id}`);
    }
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <Card className="my-3 px-3 w-50 mx-3 shadow">
        <div className="d-flex align-items-center">
          <Card.Img
            variant="top"
            src={jobImage}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="p-3" style={{ width: "50%" }}>
            <Card.Title className="mb-1">{title}</Card.Title>
            <Card.Text className="mb-1">
              Location - <i className="fas fa-map-marker-alt mr-2"></i>
              {location}
            </Card.Text>
            <Card.Text className="mb-3">Description - {description}</Card.Text>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="primary" onClick={updateJob}>
                Update
              </Button>
              <Button variant="danger" onClick={deleteJob}>
                Delete
              </Button>
              <Button variant="info" onClick={handlePopup}>
                Applicants
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Modal show={showPopup}>
        <Modal.Header>
          <Modal.Title>View Applicant Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please enter the secret key shared for you to have job-id:{id}{" "}
          <span style={{ fontWeight: "bolder" }}>Admin Access Right.</span>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="info" type="submit" className="mt-3">
              Authorize
            </Button>
            {isPasswordCorrect && <p className="mt-1">Authorized</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CompanyJobCard.propTypes = {};

CompanyJobCard.defaultProps = {};

export default CompanyJobCard;
