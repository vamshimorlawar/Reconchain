import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CandidateCard.module.css';
import CompanyNav from "../CompanyNav/CompanyNav";

import axios from "axios";
import { ToastContainer } from "react-bootstrap";



const CandidateCard = () => {

  const [CandidateData, setCandidateData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/getCandidatesProfile");
    console.log(res.data.posts);
    setCandidateData(res.data.posts);
  };
  return (
    <div>  
    <CompanyNav></CompanyNav>
    <div className='mt-5 mx-5 container'>
      <table className='table'>
        <thead>
          <tr>
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
    </div>

  </div>
  );

  

};

CandidateCard.propTypes = {};

CandidateCard.defaultProps = {};

export default CandidateCard;
