import React, { Fragment, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useHistory } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const UpdateCodingQuestion = ({ id }) => {
  const history = useHistory();
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
      const { data } = await axios.put(
        `/api/v1/admin/updateQuestions/${id}`,
        {
          questionType: "coding",
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
        alert("Question updated Successfully");
        history.push("/admin/AllQuestions");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    response();
  };
  const getQuestionDetails = async () => {
    const { data } = await axios.get(`/api/v1/admin/getQuestion/${id}`);
    setcodeText(data.questions.codeText);
    setquestion({
      heading: data.questions.heading,
      level: data.questions.level,
      score: data.questions.score,
      input: data.questions.input,
      output: data.questions.output,
    });
  };
  useEffect(() => {
    getQuestionDetails();
  }, []);

  return (
    <Fragment>
      <div className="coding-question-container">
        <h1>Update Coding Question</h1>
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
                data={codeText}
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
              <input type="submit" value="UPDATE" className="button-save" />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateCodingQuestion;
