import React, { Fragment, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
const SolveSteps = ({ activeStep }) => {
  const [totalQuestions, settotalQuestions] = useState(0);
  const steeeps = [];
  [...Array(totalQuestions)].map((e, i) => steeeps.push(`${i + 1}`));
  const response = async () => {
    const { data } = await axios.get("/api/v1/admin/getAllQuestions");
    settotalQuestions(data.questions.length+data.multiple.length)
  };
  useEffect(() => {
    response();
  }, [totalQuestions]);
  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          ".MuiStepConnector-root": {
            top: 0,
          },
          ".MuiStepConnector-root span": {
            borderColor: "transparent",
          },
          ".MuiStepConnector-root span::before": {
            display: "flex",
            justifyContent: "center",
          },
          ".MuiSvgIcon-root": {
            borderRadius: "50%",
            border: "1px solid #080c11",
          },
          ".MuiSvgIcon-root:not(.Mui-completed)": {
            color: "#080c11",
          },
          ".MuiStepIcon-text": {
            fill: "gray",
            fontWeight: 500,
          },
          ".MuiSvgIcon-root.Mui-active": {
            color: "white",
            padding: "3px",
            borderRadius: "50%",
            marginY: "-3px",
          },
          ".Mui-active .MuiStepIcon-text": {
            fill: "white",
          },
        }}
      >
        {steeeps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
            style={{
              marginBottom: "30px",
              color: "#ffffff",
              marginLeft: "10px",
              textAlign: "center",
            }}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#ffffff" : "gray",
                lineHeight: "50px",
              }}
            >
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default SolveSteps;
