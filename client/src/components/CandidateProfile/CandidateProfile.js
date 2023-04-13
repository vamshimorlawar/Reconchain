import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import styles from "./CandidateProfile.module.css";
import CandidateNav from "../CandidateNav/CandidateNav";
import axios from "axios";

const CandidateProfile = () => {
  const [formData, setFormData] = useState(null);

  const email = sessionStorage.getItem("email");

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3001/getCandidateProfile", {email: email});
    setFormData(res.data);
  };

  if(!formData){
    return <div>Loading ...</div>
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  console.log(formData);
  return (
    <div>
      <CandidateNav></CandidateNav>
      <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

CandidateProfile.propTypes = {};

CandidateProfile.defaultProps = {};

export default CandidateProfile;