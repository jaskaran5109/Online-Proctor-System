import React, { useEffect, useState, useCallback } from "react";
import SolveAllQuestionList from "./SolveAllQuestionList";
import "./SolveQuestions.css";
import SolveSteps from "./SolveSteps";
import GoToQuestion from "./GoToQuestion/GoToQuestion";
import Logo from "../../Images/logo.png";
import axios from "axios";
import Webcamp from "./WebCamp/Webcamp";
import { useHistory } from "react-router-dom";
import Timer from "../Timer";

const SolveQuestions = ({ capture,imageSrc }) => {
  const history= useHistory()
  const [onClickAll, setonClickAll] = useState(true);
  const [onClickQuestion, setonClickQuestion] = useState(false);
  const [webenabled, setwebenabled] = useState(true);
  const [testDetails, settestDetails] = useState([]);
  // console.log(location.state.quesid)
  const response2 = async () => {
    const { data } = await axios.get("/api/v1/testDetail");
    data.test.map((item) => {
      settestDetails(item);
    });

  };
  useEffect(() => {
    response2();
  }, []);
  return (
    <div className="question_body">
      <div className="question-header">
        <img src={Logo} alt="HackMe" />
        <h3 className="question-title">{testDetails.organizationName}</h3>
        <div className="question-bar">
          <div className="question-time">
            <Timer minute={60}/> <h4 style={{marginLeft: '10px'}}>Minutes</h4>
          </div>
          <button
            className="submit-button"
            onClick={() => {
              history.push("/thankyou");
              document.documentElement.requestFullscreen &&
                document.exitFullscreen();
            }}
          >
            Submit Test
          </button>
        </div>
      </div>
      <div className="question-body">
        <div className="question-body-sidebar">
          <h3
            style={{
              marginBottom: "30px",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setonClickAll(true);
              history.push("/solveQuestions");
            }}
          >
            All
          </h3>
          <SolveSteps />
        </div>
        <div className="question-body-main">
          {onClickAll ? (
            <SolveAllQuestionList
              setonClickQuestion={setonClickQuestion}
              setonClickAll={setonClickAll}
              capture={capture}
            />
          ) : (
            <GoToQuestion imageSrc={imageSrc} capture={capture}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolveQuestions;
