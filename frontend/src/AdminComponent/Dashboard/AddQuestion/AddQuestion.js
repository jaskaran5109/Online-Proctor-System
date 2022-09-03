import React, { Fragment, useState } from "react";
import CreateCodingQuestion from "./CreateCodingQuestion";
import CreateMultipleChoice from "./CreateMultipleChoice";

const AddQuestion = () => {
  const [questionType, setquestionType] = useState("coding");
  return (
    <Fragment>
      <div className="navigatorContainer">
        <h1>ADD QUESTION</h1>
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
          <CreateCodingQuestion questionType={questionType} />
        ) : (
          <CreateMultipleChoice questionType={questionType} />
        )}
      </div>
    </Fragment>
  );
};

export default AddQuestion;
