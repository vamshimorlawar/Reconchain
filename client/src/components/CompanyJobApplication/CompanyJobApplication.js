import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CompanyJobApplication.module.css";
import { useParams } from "react-router-dom";
import CompanyNav from "../CompanyNav/CompanyNav";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

const CompanyJobApplication = () => {
  const id = useParams().id;
  const company_email = sessionStorage.getItem("email");

  const [CandidateData, setCandidateData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowSelect = (event) => {
    setSelectedRow(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected row: ", selectedRow);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Based on Emails get their details
  const fetchData = async () => {
    const applicants = await axios.post(
      "http://localhost:3001/getJobApplicants",
      {
        id: id,
        email: company_email,
      }
    );

    const applicantsData = applicants.data.result;
    const candidateData = [];
    applicantsData.forEach(async (applicant) => {
      const res = await axios.post(
        "http://localhost:3001/getCandidateProfile",
        { email: applicant.candidate_email }
      );
      candidateData.push(res.data);
      if (candidateData.length === applicantsData.length) {
        setCandidateData(candidateData);
      }
    });
  };

  return (
    <div>
      <CompanyNav></CompanyNav>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Company Job Applications</Card.Title>
            <Card.Text>
              <strong>Job ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {company_email}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="mt-5 mx-5 container">
          <Form onSubmit={handleSubmit}>
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>id</th>
                  <th>username</th>
                  <th>email</th>
                  <th>rating</th>
                  <th>interest</th>
                  <th>education</th>
                  <th>experience</th>
                  <th>skills</th>
                  <th>languages</th>
                  <th>mobile</th>
                </tr>
              </thead>
              <tbody>
                {CandidateData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Form.Check
                        type="radio"
                        name="rowSelect"
                        value={row.id}
                        onChange={handleRowSelect}
                        checked={selectedRow === row.id}
                      />
                    </td>
                    <td>{row.id}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.rating}</td>
                    <td>{row.interests}</td>
                    <td>{row.education}</td>
                    <td>{row.experience}</td>
                    <td>{row.skills}</td>
                    <td>{row.languages}</td>
                    <td>{row.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button type="submit" className="mt-5">Hire Candidate</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

CompanyJobApplication.propTypes = {};

CompanyJobApplication.defaultProps = {};

export default CompanyJobApplication;
