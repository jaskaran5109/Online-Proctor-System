import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentNavbar from "../StudentNavbar";
import StudentSteps from "../StudentSteps";
import "./Instructions.css";
import { Link } from "react-router-dom";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
const Instructions = () => {
  const [multipleQuestions, setmultipleQuestions] = useState(0);
  const [codingQuestions, setcodingQuestions] = useState(0);
  const [testDetails, settestDetails] = useState([]);

  const response1 = async () => {
    const { data } = await axios.get("/api/v1/admin/getAllQuestions");
    // setTotalQuestions(data.questions.length + data.multiple.length);
    setmultipleQuestions(data.multiple.length);
    setcodingQuestions(data.questions.length);
  };
  const response2 = async () => {
    const { data } = await axios.get("/api/v1/testDetail");
    data.test.map((item) => {
      settestDetails(item);
    });
  };
  useEffect(() => {
    response1();
    response2();
  }, [multipleQuestions, codingQuestions]);
  let el = document.documentElement;

  return (
    <div className="testInstructions">
      <StudentNavbar />
      <StudentSteps activeStep={1} />
      <div className="instruction-container">
        <div className="heading-instruction">
          <h3>About this test</h3>
          <p>
            Welcome to the{" "}
            {testDetails.organizationName}
            Assessment process 2023. Thank you for your partition. Please read
            the Test Instructions provide before attempting the Test. This is a
            timed assessment which has 2 sections MCQ-Technical and Programming.
            The test should take you about{" "}
            {testDetails.testDuration} minutes
            to complete.
          </p>
          <p>All the best !</p>
          <p>Regards,</p>
          <p>Recruitment Team</p>
          <p>{testDetails.organizationName}</p>
        </div>
        <div className="heading-instruction">
          <h3>General Instructions</h3>
          <p>
            <li>
              Test Duration :{" "}
              {testDetails.testDuration}{" "}
              Minutes
            </li>
            <li>Ensure that your email ID is correct</li>
            <li>
              Click <b>Submit</b> after you answer each question
            </li>
          </p>
        </div>
        <div className="heading-instruction">
          <h3>The test will have the following types of questions</h3>
          <div className="test-questions">
            <p>{multipleQuestions} Multiple Choice</p>
            <p>{codingQuestions} Programming</p>
          </div>
        </div>
        <div className="heading-instruction">
          <h3>Allowed programming language</h3>
          <div className="test-questions">
            <p>Bash</p>
            <p>C</p>
            <p>C#</p>
            <p>C++</p>
            <p>Go</p>
            <p>Java</p>
            <p>JavaScript</p>
            <p>Kotlin</p>
            <p>PHP</p>
            <p>Python</p>
            <p>Perl</p>
            <p>Ruby</p>
            <p>Rust</p>
            <p>Swift</p>
          </div>
        </div>
        <div className="instruction-button">
          <Link
            to={{
              pathname: `/solveQuestions`,
            }}
            onClick={() => {
              el.requestFullscreen && el.requestFullscreen();
            }}
          >
            <Button>Start Test</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
