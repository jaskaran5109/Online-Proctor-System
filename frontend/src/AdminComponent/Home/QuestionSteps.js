import React, { Fragment } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const QuestionSteps = ({ activeStep }) => {
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
  const steeeps = [];
    var number = Number(testDetails.noOfQuestions),
    sNumber = number.toString();
  // [sNumber.length+1].map((e, i) =>
  //   steeeps.push(`Question ${i + 1}`)
  // );
  for(let i=0;i<number;i++)
  {
    steeeps.push(`Question ${i + 1}`)
  }
  console.log("Steps ",number)
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steeeps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
            >
              {item}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default QuestionSteps;
