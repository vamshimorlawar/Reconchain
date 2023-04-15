import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyProfile.module.css";
import { ToastContainer, toast } from "react-toastify";
import CompanyNav from "../CompanyNav/CompanyNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CompanyProfile = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getCompanyProfile", {
      email: email,
    });
    setFormData(res.data);
  };

  if (!formData) {
    return <div>Loading ...</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function  deleteCompanyProfile() {
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
        await contract.deleteCompanyProfile();
        contract.on("CompanyProfileDeleted", function (address, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Company Address", address);
          
          if (address) {
            axios
      .post("http://localhost:3001/deleteCompanyProfile", { email: email })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Profile Deleted Succesfully");
          toast.success("Profile Deleted Successfully", { autoClose: 1999 });
          setTimeout(() => {
            sessionStorage.clear();
            navigate("/login");
          }, 2000);
        } else {
          console.log("Profile Delete Failed");
          toast.error("Profile Delete Failed");
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
  const deleteProfile = async (event) => {
    event.preventDefault();
    await deleteCompanyProfile();
  };

  // UPDATE -----------------------------------------
  async function updateCompanyProfile() {
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
        await contract.updateCompanyProfile(formData.username, email);
        contract.on("CompanyProfileUpdated", function (address, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Company Address", address);
          
          if (address) {
            axios
              .post("http://localhost:3001/updateCompanyProfile", {
                email: email,
                company_name: formData.company_name,
                location: formData.location,
                mobile: formData.mobile,
                website: formData.website,
                about: formData.about,
              })
              .then((res) => {
                if (res.data.status === "success") {
                  console.log("Profile updated");
                  toast.success("Updated Profile");
                } else {
                  console.log("Update Failed");
                  toast.error("Update Failed");
                }
              });
          }
        });
      } catch (error) {
        toast.error(regex.exec(error.reason)[1]);
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  }

  const updateProfile = async (event) => {
    event.preventDefault();
    await updateCompanyProfile();
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <ToastContainer />
      <div className="w-50 m-3">
        <Form onSubmit={updateProfile}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              value={formData.company_name}
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

          <Form.Group controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAbout">
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formJobPosts">
            <Form.Label>Nummber of Job Posts</Form.Label>
            <Form.Control
              type="text"
              name="job_posts"
              value={formData.number_job_posts}
              readOnly
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Update Profile
          </Button>
          <Button
            variant="danger"
            onClick={deleteProfile}
            className="mt-3 mx-5"
          >
            Delete Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

CompanyProfile.propTypes = {};

CompanyProfile.defaultProps = {};

export default CompanyProfile;
