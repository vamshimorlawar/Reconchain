import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CandidateJobCard.module.css";
import jobImage from "../../images/job.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CandidateJobCard = (props) => {
  const id = props.id;
  const title = props.title;
  const description = props.description;
  const location = props.location;
  const email = props.email;

  const [isReportDisabled, setIsReportDisabled] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleReport = () => {
    setIsReportDisabled(true);
    axios.post("http://localhost:3001/reportJob", {id: id, email: email}).then((res)=>{
      if(res.data.status === "success"){
        console.log("Reported Successfully");
        toast.success("Reported Job!")
      }else{
        console.log("Report failed");
        toast.error("Report Failed");
      }
    })
  };
  return (
    <div>
      <ToastContainer/>
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
              Company - {email}, Location -
              <i className="fas fa-map-marker-alt mr-2"></i>
              {location}
            </Card.Text>
            <Card.Text className="mb-3">Description - {description}</Card.Text>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button variant="primary">Apply</Button>
              <Button variant="danger" onClick={handleReport} disabled={isReportDisabled}>Report</Button>
              <Button variant="info" onClick={handlePopup}>
                Contact
              </Button>
              <Button variant="warning">Rating</Button>
            </div>
          </div>
        </div>
      </Card>
      <Modal show={showPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Single Point of Contact - {email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CandidateJobCard.propTypes = {};

CandidateJobCard.defaultProps = {};

export default CandidateJobCard;
