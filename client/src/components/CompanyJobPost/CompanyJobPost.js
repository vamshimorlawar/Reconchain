import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyJobPost.module.css";
import axios from "axios";

const CompanyJobPost = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addJobPost = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/addJobPost", {
        company_email: email,
        title: formData.title,
        description: formData.description,
        tag: formData.tag,
        location: formData.location,
        type: formData.type,
        salary: formData.salary
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Job Posted");
        } else {
          console.log("Job Post Failed");
        }
      });
  };

  return (
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
        onChange={handleChange} />
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

      <Button type="submit">Add Job Post</Button>
    </Form>
  );
};

CompanyJobPost.propTypes = {};

CompanyJobPost.defaultProps = {};

export default CompanyJobPost;
