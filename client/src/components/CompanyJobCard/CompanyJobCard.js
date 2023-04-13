import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CompanyJobCard.module.css";
import jobImage from "../../images/job.png";

const CompanyJobCard = (props) => {
  const title = props.title;
  const description = props.description;
  const location = props.location;

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
            <Card.Text className="mb-1">
              Location - <i className="fas fa-map-marker-alt mr-2"></i>{location}
            </Card.Text>
            <Card.Text className="mb-3">
              Description - {description}
            </Card.Text>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="primary">Update</Button>
              <Button variant="danger">Delete</Button>
              <Button variant="info">Applicants</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

CompanyJobCard.propTypes = {};

CompanyJobCard.defaultProps = {};

export default CompanyJobCard;
