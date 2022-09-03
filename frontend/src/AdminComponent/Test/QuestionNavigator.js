import axios from "axios";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import QuestionSteps from "../Home/QuestionSteps";
import CodingQuestion from "./CodingQuestion/CodingQuestion";
import MultipleChoice from "./MultipleChoiceQuestion/MultipleChoice";
import "./QuestionNavigator.css";
const QuestionNavigator = () => {
  const [steps, setSteps] = useState(0);
  
  const [questionType, setquestionType] = useState("coding");
  const [testDetails, settestDetails] = useState([]);
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
    <Fragment>
      <div className="navigatorContainer">
        <QuestionSteps activeStep={steps} className="steps" />
        <div className="inputBox">
          <label htmlFor="questionType">Type Of Question:</label>

          <select
            name="questionType"
            required
            value={questionType}
            onChange={(e) => setquestionType(e.target.value)}
          >
            <option value="coding">Coding</option>
            <option value="multiple">Multiple Choice</option>
          </select>
        </div>
        {questionType === "coding" ? (
          <CodingQuestion
            questionType={questionType}
            setSteps={setSteps}
            steps={steps}
            questionss={testDetails.noOfQuestions}
          />
        ) : (
          <MultipleChoice
            questionType={questionType}
            setSteps={setSteps}
            steps={steps}
            questionss={testDetails.noOfQuestions}
          />
        )}

        {/* <div className="saveandnext">
          <input
            type="button"
            value="BACK"
            onClick={handleBack}
            disabled={steps === 0}
          />
          <input type="button" value="NEXT" onClick={handleNext} />
        </div> */}
      </div>
    </Fragment>
  );
};

export default QuestionNavigator;
