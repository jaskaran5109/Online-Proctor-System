import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import parse from "html-react-parser";
import "./SolveMultipleQuestion.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useHistory, Redirect, Link } from "react-router-dom";

const SolveMultipleQuestion = ({ id ,capture,imageSrc}) => {
  const [questionData, setQuestionData] = useState({});
  const history = useHistory();
  const [text, setText] = useState("");
  const [probimages, setProbImages] = useState([]);
  const response = async () => {
    const { data } = await axios.get(`/api/v1/admin/getQuestion/${id}`);
    setQuestionData(data.multiple);
    setText(data.multiple.questionText);
  };

  useEffect(() => {
    response();
  }, [questionData, text]);
  const [value, setValue] = useState(
    `${localStorage.getItem("multipleChoiceValue")}`
  );

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem(
      "multipleChoiceValue",
      JSON.stringify(event.target.value)
    );
  };
  const response2 = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/multiplesolution/${questionData._id}`,
      {
        questionType: "multiple",
        heading: questionData.heading,
        score: value === questionData.output ? questionData.score : 0,
        images:imageSrc,
        option:value,
        questionId: questionData._id,
      },
      config
    );
  };
  const handleSubmit = (e) => {
    response2();
    localStorage.setItem("multipleChoiceValue", JSON.stringify(value));
    history.push({
      pathname: "/solveQuestions",
      state: { quesid: questionData._id },
    });
    capture()
  };
  let el = document.documentElement;
  return (
    <Fragment>
      <div className="multiple-container">
        <h1 className="multiple-heading">{questionData.heading}</h1>
        <h1 className="multiple-question">{parse(text)}</h1>
        <p className="multiple-pick">
          {" "}
          Pick <b>ONE</b> option
        </p>
        <form className="multiple-form" onSubmit={handleSubmit}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            className="radioGroup"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              className="form-input-label"
              value={questionData.option1}
              control={<Radio className="radioClassMultiple" />}
              label={questionData.option1}
            />
            <FormControlLabel
              className="form-input-label"
              value={questionData.option2}
              control={<Radio className="radioClassMultiple" />}
              label={questionData.option2}
            />
            <FormControlLabel
              className="form-input-label"
              value={questionData.option3}
              control={<Radio className="radioClassMultiple" />}
              label={questionData.option3}
            />
            <FormControlLabel
              className="form-input-label"
              value={questionData.option4}
              control={<Radio className="radioClassMultiple" />}
              label={questionData.option4}
            />
          </RadioGroup>
          <button type="submit" className="form_button">
            SAVE & NEXT
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SolveMultipleQuestion;
