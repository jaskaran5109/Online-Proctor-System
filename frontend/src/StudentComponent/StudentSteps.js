import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, { Fragment } from "react";

const StudentSteps = ({activeStep}) => {
    const steps =[
        {
            label:<Typography style={{color:"white"}}>Enter the test</Typography>,
            icon: <LocalShippingIcon/>
        },
        {
            label:<Typography style={{color:"white"}}>Read Instructions</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label:<Typography style={{color:"white"}}>Solve Questions</Typography>,
            icon: <AccountBalanceIcon/>
        }
    ]

    const stepStyles={
        boxSizing: "border-box",
    }
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} sx={{pt:'14px',color:'#FFFFFF'}}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
            
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "white" : "grey",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default StudentSteps;
