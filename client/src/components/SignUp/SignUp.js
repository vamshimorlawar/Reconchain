import React from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
import axios from 'axios';

const signup = () => {
  axios.post("http://localhost:3001/signup", {username: "Vamshi"})
  .then((res)=>{
    console.log(res);
  });
  
}

const SignUp = () => (
  <div className={styles.SignUp}>
    SignUp Component
    <button onClick={signup}>
      Submit
    </button>
  </div>
);

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
