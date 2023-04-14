import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CandidateJobApplication.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import CandidateNav from "../CandidateNav/CandidateNav";
import { useParams } from "react-router-dom";

const CandidateJobApplication = () => {
  const id = useParams().id;
  const company_email = useParams().company_email;

  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .post("http://localhost:3001/getJobPost", {
        id: id,
        email: company_email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setJobData(res.data.posts[0]);
        }
      });
  };

  if (!jobData) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <CandidateNav></CandidateNav>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">{jobData.title}</h2>
            <p className="text-muted text-center">
              {jobData.location} | {jobData.type}
            </p>
            <hr />
            <p className="text-justify">{jobData.description}</p>
            <hr />
            <p>Salary: ${jobData.salary} per year</p>
            <p>Tags: ${jobData.tag}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <hr />
            <h4>Apply for this job</h4>
            <Form>
              <Form.Group controlId="formFile">
                <Form.Label>Upload your resume</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-5">
                Confirm Application
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CandidateJobApplication.propTypes = {};

CandidateJobApplication.defaultProps = {};

export default CandidateJobApplication;
