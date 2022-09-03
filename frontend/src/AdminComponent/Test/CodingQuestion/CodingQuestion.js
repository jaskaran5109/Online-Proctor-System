import React, { Fragment, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useHistory } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CodingQuestion.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";

const CodingQuestion = (
  { questionType, setSteps, steps}
) => {
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
  const questionss = Number(testDetails.noOfQuestions);
  const history=useHistory();
  const [codeText, setcodeText] = useState("");
  const [question, setquestion] = useState({
    heading: "",
    level: "Easy",
    score: "",
    input: "",
    output: "",
  });

  const handleChange = (e) => {
    setquestion({ ...question, [e.target.name]: e.target.value });
  };
  const response = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        `/api/v1/admin/codingquestions`,
        {
          questionType,
          heading: question.heading,
          level: question.level,
          score: question.score,
          codeText,
          input: question.input,
          output: question.output,
        },
        config
      );
      if (data.success) {
        alert("Question added Successfully");
        setcodeText("");
        setquestion({
          heading: "",
          level: "Easy",
          score: "",
          input: "",
          output: "",
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (steps == questionss-1) {
      history.push("/");
    }
    response();    
    setSteps((prevStep) => prevStep + 1);
  };
  return (
    <Fragment>
      <div className="coding-question-container">
        <form onSubmit={handleSubmit}>
          <div className="formContainer">
            <div className="inputBox">
              <label>Heading:</label>
              <input
                type="text"
                required
                placeholder="Question Heading or Name"
                name="heading"
                value={question.heading}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="level">Difficulty Level:</label>

              <select
                name="level"
                id="level"
                required
                value={question.level}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>Easy
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="inputBox">
              <label>Score:</label>
              <input
                type="number"
                required
                placeholder="Score"
                name="score"
                value={question.score}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-container">
            <div className="coding-question-editor">
              <CKEditor
                editor={ClassicEditor}
                onChange={(e, editor) => setcodeText(editor.getData())}
                required
              ></CKEditor>
            </div>
            <div className="inputBox">
              <label>Input:</label>
              <input
                type="text"
                required
                placeholder="Question Input"
                name="input"
                value={question.input}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Desired Output:</label>
              <input
                type="text"
                required
                placeholder="Output"
                name="output"
                value={question.output}
                onChange={handleChange}
              />
            </div>
            <div className="saveandnext">
              <input
                type="submit"
                value="SAVE & NEXT"
                className="button-save"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CodingQuestion;
