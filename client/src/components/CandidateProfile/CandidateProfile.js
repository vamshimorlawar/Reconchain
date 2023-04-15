import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CandidateProfile.module.css";
import { toast, ToastContainer } from "react-toastify";
import CandidateNav from "../CandidateNav/CandidateNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const updateProfile = (event) => {
    event.preventDefault();
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
          console.log("dProfile updated");
          toast.success("Profile Updated Successfully", {autoClose: 1999});
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.log("Update Failed");
        }
      });
  };
  return (
    <div>
      <ToastContainer/>
      <CandidateNav></CandidateNav>
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
