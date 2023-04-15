import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyUpdateJobPost.module.css";
import axios from "axios";
import CompanyNav from "../CompanyNav/CompanyNav";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CompanyUpdateJobPost = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");
  const id = useParams().id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getJobPost", {
      id: id,
      email: email,
    });
    setFormData(res.data.posts[0]);
  };

  if (!formData) {
    return <div>Loading ...</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function updateJobPosting() {
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
        console.log("Formadata block job id", formData.block_job_id);
        await contract.updateJobPosting(formData.block_job_id, formData.title, formData.tag);
        contract.on(
          "JobPostingUpdated",
          function (address, block_job_id, event) {
            let blockNumber = event.blockNumber;
            if (eventBlocks.has(blockNumber)) return;
            eventBlocks.add(blockNumber);

            console.log("Result Company Address", address, block_job_id);
            console.log("Address inside submit", address, block_job_id);
            if (address) {
              axios
                .post("http://localhost:3001/updateJobPost", {
                  id: id,
                  email: email,
                  title: formData.title,
                  description: formData.description,
                  tag: formData.tag,
                  location: formData.location,
                  type: formData.type,
                  salary: formData.salary
                })
                .then((res) => {
                  if (res.data.status === "success") {
                    console.log("Job Post Updated");
                    toast.success("Job Post Updated Successfully", {
                      autoClose: 1999,
                    });
                  } else {
                    console.log("Job Post Update Failed");
                    toast.error("Job Post Update Failed");
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

  const updateJobPost = async (event) => {
    event.preventDefault();
    await updateJobPosting();
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <ToastContainer />
      <div className="mx-3 mt-3 w-50">
        <Form onSubmit={updateJobPost}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formTag">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSalary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formReport">
            <Form.Label>Report</Form.Label>
            <Form.Control
              type="number"
              name="report"
              value={formData.report}
              readOnly
            />
          </Form.Group>

          <Button type="submit" className="mt-3">
            Update Job Post
          </Button>
        </Form>
      </div>
    </div>
  );
};

CompanyUpdateJobPost.propTypes = {};

CompanyUpdateJobPost.defaultProps = {};

export default CompanyUpdateJobPost;
