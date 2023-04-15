import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CandidateJobCard.module.css";
import jobImage from "../../images/job.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CandidateJobCard = (props) => {
  const id = props.id;
  const title = props.title;
  const description = props.description;
  const location = props.location;
  const email = props.email; //company email
  const report = props.report;
  const hideApply = props.hideApply ? props.hideApply : false;
  const report_flag = props.report_flag;
  const candidate_email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  let doubleApply = false;
  let maxApplication = false;

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleApply = async () => {
    const res = await axios.post("http://localhost:3001/checkAlreadyApplied", {
      candidate_email: candidate_email,
      company_email: email,
    });

    if (res.data.status === "success") {
      if (res.data.count < 1) {
        // navigate(`/candidate-job-apply/${id}/${email}`);
      } else {
        doubleApply = true;
        toast.error(
          "You can't for two job roles at same company, Try applying another company",
          { autoClose: 4000 }
        );
      }
    }

    const res_2 = await axios.post("http://localhost:3001/numberJobsApplied", {
      email: candidate_email,
    });

    if (res_2.data.status === "success") {
      if (res_2.data.count < 10) {
        // navigate(`/candidate-job-apply/${id}/${email}`);
      } else {
        maxApplication = true;
        toast.error("You've reached your MAX LIMIT 10 to apply for Jobs", {
          autoClose: 4000,
        });
      }
    }

    if (!(doubleApply || maxApplication)) {
      navigate(`/candidate-job-apply/${id}/${email}`);
    }
  };

  const handleReport = () => {
    document.getElementById("report").disabled = true;
    axios
      .post("http://localhost:3001/reportJob", {
        id: id,
        candidate_email: candidate_email,
        company_email: email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Reported Successfully");
          toast.success("Reported Job!", { autoClose: 1999 });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.log("Report failed");
          toast.error("Report Failed");
          document.getElementById("report").disabled = false;
        }
      });
  };
  return (
    <div>
      <ToastContainer />
      <Card className="my-3 px-3 w-50 mx-3 shadow">
        <div className="d-flex align-items-center">
          <Card.Img
            variant="top"
            src={jobImage}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="p-3" style={{ width: "50%" }}>
            <Card.Title className="mb-1">{title}</Card.Title>
            {report >= 2 ? (
              <Card.Title style={{ color: "red" }}>
                {"Fraudulent job post!!!"}
              </Card.Title>
            ) : null}
            {/* <Card.Title className="mb-1">{report}</Card.Title> */}
            <Card.Text className="mb-1">
              Company - {email}, Location -
              <i className="fas fa-map-marker-alt mr-2"></i>
              {location}
            </Card.Text>
            <Card.Text className="mb-3">Description - {description}</Card.Text>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button
                variant="primary"
                onClick={handleApply}
                style={{ display: hideApply ? "none" : "block" }}
              >
                Apply
              </Button>
              <Button
                variant="danger"
                id="report"
                onClick={handleReport}
                disabled={report_flag > 0}
              >
                Report
              </Button>
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
