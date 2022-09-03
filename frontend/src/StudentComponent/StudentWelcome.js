import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentNavbar from "./StudentNavbar";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import "./StudentWelcome.css";
import StudentSteps from "./StudentSteps";
import axios from "axios";
import useCountDown from "react-countdown-hook";
import { useTimeDiff } from "react-use-timediff";
import { Link } from "react-router-dom";
const StudentWelcome = () => {
  const { isAuthenticated, student } = useSelector((state) => state.student);
  const [questionCount, setQuestionCount] = useState(0);
  const [testDetails, settestDetails] = useState([]);
  const [times, setTime] = useState(false);
  const [days, setDays] = useState("");
  const [hours, sethours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const response = async () => {
    const { data } = await axios.get("/api/v1/admin/getAllQuestions");
    setQuestionCount(data.questions.length + data.multiple.length);
  };
  const response2 = async () => {
    const { data } = await axios.get("/api/v1/testDetail");
    data.test.map((item) => {
      settestDetails(item);
    });
  };
  let timeanddate = testDetails.dateAndTime;

  useEffect(() => {
    response();
    response2();
  }, [questionCount]);

  let countDownDate = new Date(timeanddate).getTime();
  let x = setInterval(function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setDays(days);
    sethours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

    if (distance < 0) {
      clearInterval(x);
      setTime(true);
    }
  }, 1000);

  return (
    <div className="studentWelcome">
      <StudentNavbar />
      <StudentSteps activeStep={0} />
      <div className="welcome-container">
        <div className="left-side">
          <h5 className="welcome-title">Hi{` ${student.name},`}</h5>
          <h4>Welcome to</h4>
          <h1>Online Test - 2023</h1>
          <div className="data-welcome">
            <div>
              <h5>Question count</h5>
              <h4>{`${questionCount} Questions`}</h4>
            </div>
            <div>
              <h5>Test Duration</h5>
              <h4>{`${testDetails.testDuration} Minutes`}</h4>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div>
            <img src="clock.jpeg" className="clock_image" alt="Time" />
            <div className="shadow"></div>
          </div>
          {times ? (
            <div className="test-start">
              <Link to="/testInstructions"><button
                className="startButton"
              >
                Start Test
              </button></Link>
            </div>
          ) : (
            <div className="little-early">
              <h4>Looks like you are little early here!</h4>
              {days > 0 ? (
                <p>{`Test will start in : ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds `}</p>
              ) : (
                <p>{`Test will start in :  ${hours} Hours ${minutes} Minutes ${seconds} Seconds `}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentWelcome;
