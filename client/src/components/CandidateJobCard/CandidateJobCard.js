import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CandidateJobCard.module.css";
import jobImage from "../../images/job.png";

const CandidateJobCard = (props) => {
  const title = props.title;
  const description = props.description;
  const location = props.location;
  const email = props.email;
  return (
    <div>
      <Card className="my-3 px-3 w-50 mx-3 shadow">
        <div className="d-flex align-items-center">
          <Card.Img
            variant="top"
            src={jobImage}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="p-3" style={{ width: "50%" }}>
            <Card.Title className="mb-1">{title}</Card.Title>
            <Card.Text className="mb-1">Company - {email}, Location -
              <i className="fas fa-map-marker-alt mr-2"></i>
              {location}
            </Card.Text>
            <Card.Text className="mb-3">Description - {description}</Card.Text>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="primary">Apply</Button>
              <Button variant="danger">Report</Button>
              <Button variant="info">Contact</Button>
              <Button variant="warning">Rating</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

CandidateJobCard.propTypes = {};

CandidateJobCard.defaultProps = {};

export default CandidateJobCard;