import axios from "axios";
import React, { Fragment, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CreateTest.css";

const CreateTest = () => {
  const history = useHistory();
  const [inputs, setinputs] = useState({
    name: "",
    organizationName: "",
    testDateTime: "",
    testDuration: "",
    noOfQuestions: "",
  });
  const registerDataChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const response = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      await axios.post(
        `/api/v1/testDetails`,
        {
          name: inputs.name,
          organizationName: inputs.organizationName,
          dateAndTime: inputs.testDateTime,
          testDuration: parseInt(inputs.testDuration),
          noOfQuestions: parseInt(inputs.noOfQuestions),
        },
        config
      );
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    response();
    // return(
    //   <Redirect to="/admin/questionNavigate"/>
    // )
    history.replace("/admin/questionNavigate");
  };

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <h2>Test Details</h2>
          <form
            className="signUpForm"
            onSubmit={registerSubmit}
          >
            <div className="signUpinput">
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={inputs.name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpinput">
              <input
                type="text"
                placeholder="Organization Name"
                required
                name="organizationName"
                value={inputs.organizationName}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpinput">
              <input
                type="datetime-local"
                placeholder="Test Date and Time"
                required
                min="2022-09-01T07:30" max="2030-10-28T16:30"
                name="testDateTime"
                value={inputs.testDateTime}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpinput">
              <input
                type="number"
                placeholder="Test Duration in Minutes"
                required
                name="testDuration"
                value={inputs.testDuration}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpinput">
              <input
                type="number"
                placeholder="No Of Questions"
                required
                name="noOfQuestions"
                value={inputs.noOfQuestions}
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Submit" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateTest;
