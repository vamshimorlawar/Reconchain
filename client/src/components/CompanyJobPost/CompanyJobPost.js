import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyJobPost.module.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CompanyNav from "../CompanyNav/CompanyNav";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CompanyJobPost = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  async function createJobPosting() {
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
        await contract.createJobPosting(formData.title, formData.tag);
        contract.on("JobPostingCreated", function (address, block_job_id, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Company Address", address, block_job_id);
          console.log("Address inside submit", address, block_job_id);
          if (address) {
            axios
              .post("http://localhost:3001/addJobPost", {
                company_email: email,
                title: formData.title,
                description: formData.description,
                tag: formData.tag,
                location: formData.location,
                type: formData.type,
                salary: formData.salary,
                address: address,
                block_job_id: Number(block_job_id)
              })
              .then((res) => {
                if (res.data.status === "success") {
                  console.log("Job Posted");
                  toast.success("Job Posted Successfully");
                  navigate("/company-home");
                } else {
                  console.log("Job Post Failed");
                  toast.error("Job Post Failed");
                }
              });
          }
        });
      } catch (error) {
        toast.error(regex.exec(error.reason)[1]);
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  };
  const addJobPost = async(event) => {
    event.preventDefault();
    await createJobPosting();
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <ToastContainer />
      <div className="mx-3 mt-3 w-50">
        <Form onSubmit={addJobPost}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              // value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              // value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="tag">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              name="tag"
              // value={formData.tag}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              // value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              // value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              // value={formData.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="mt-3">
            Add Job Post
          </Button>
        </Form>
      </div>
    </div>
  );
};

CompanyJobPost.propTypes = {};

CompanyJobPost.defaultProps = {};

export default CompanyJobPost;
