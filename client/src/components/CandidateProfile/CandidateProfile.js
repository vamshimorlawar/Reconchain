import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CandidateProfile.module.css";
import { toast, ToastContainer } from "react-toastify";
import CandidateNav from "../CandidateNav/CandidateNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import Reconchain from "../../artificats/contracts/Reconchain.sol/Reconchain.json";
import { toast, ToastContainer } from "react-toastify";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

const CandidateProfile = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getCandidateProfile", {
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


  async function updateCandidateProfile() {
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
        await contract.updateCandidateProfile(formData.username, email);
        contract.on("CandidateProfileUpdated", function (address, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);

          console.log("Result Candidate Address", address);
          console.log("Address inside submit", address);
          if (address) {
            axios
              .post("http://localhost:3001/updateCandidateProfile", {
                email: email,
                interests: formData.interests,
                education: formData.education,
                experience: formData.experience,
                skills: formData.skills,
                languages: formData.languages,
                mobile: formData.mobile,
              })
              .then((res) => {
                if (res.data.status === "success") {
                  toast.success("Updated Profile Successfully");
                  console.log("Profile updated");
                } else {
                  console.log("Update Failed");
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
    await updateCandidateProfile();
}
  const deleteProfile = () => {
    axios
      .post("http://localhost:3001/deleteCandidateProfile", { email: email })
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
  };
  };
  return (
    <div>
      <ToastContainer/>
      <CandidateNav></CandidateNav>
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

          <Form.Group controlId="formInterests">
            <Form.Label>Interests</Form.Label>
            <Form.Control
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEducation">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formExperience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLanguages">
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type="text"
              name="languages"
              value={formData.languages}
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

CandidateProfile.propTypes = {};

CandidateProfile.defaultProps = {};

export default CandidateProfile;
