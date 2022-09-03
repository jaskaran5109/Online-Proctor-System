import React, { Fragment, useEffect, useState } from "react";
import "./SolveCodingQuestion.css";
import axios from "axios";
import parse from "html-react-parser";
import Landing from '../component/Landing'
const SolveCodingQuestion = ({ id }) => {
    const [questionData, setQuestionData] = useState({});
    const [quesData,setquesData]=useState({});
    const [text, setText] = useState('');
    const response = async () => {
    const { data } = await axios.get(`/api/v1/admin/getQuestion/${id}`);
    setquesData(data)
    setQuestionData(data.questions);
    setText(data.questions.codeText)
  };

  useEffect(() => {
    response();
  }, [questionData,text]);

  return (
    <Fragment>
      <div className="coding--container">
        <div className="question-container">
          <h2 className="question-heading">{questionData.heading}</h2>
          <div style={{ padding: "10px" }}>{parse(text)}</div>
        </div>
        <div className="question-codeText-container">
          <Landing quesData={quesData}/>
        </div>
      </div>
    </Fragment>
  );
};

export default SolveCodingQuestion;
