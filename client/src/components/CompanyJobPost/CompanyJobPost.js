import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyJobPost.module.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CompanyNav from "../CompanyNav/CompanyNav";

const CompanyJobPost = () => {
  const [formData, setFormData] = useState(null);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

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
        salary: formData.salary,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Job Posted");
          navigate("/company-home");
          toast.success("Job Posted Successfully");
        } else {
          console.log("Job Post Failed");
          toast.error("Job Post Failed");
        }
      });
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <ToastContainer/>
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
