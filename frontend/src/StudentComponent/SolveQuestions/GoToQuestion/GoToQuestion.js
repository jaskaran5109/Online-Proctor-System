import { useLocation } from "react-router-dom";
import React, { Fragment } from "react";
import SolveCodingQuestion from "../SolveCodingQuestion/SolveCodingQuestion";
import SolveMultipleQuestion from "../SolveMultipleQuestion/SolveMultipleQuestion";

const GoToQuestion = ({imageSrc,capture}) => {
  const location = useLocation();
  const state = location.state;
  console.log("state: ",state)
  return (
    <Fragment>
        {state.data.questionType === "coding" ? (
          <SolveCodingQuestion id={state.data.id} />
        ) : (
          <SolveMultipleQuestion id={state.data.id} imageSrc={imageSrc} capture={capture}/>
        )}
    </Fragment>
  );
};

export default GoToQuestion;
