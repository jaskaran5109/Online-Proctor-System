import React, { Fragment, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";
const UpdateMultipleQuestion = ({ id }) => {
  const history=useHistory()
  const [questionText, setquestionText] = useState("");
  const [output, setoutput] = useState("");
  const [questionHeading, setquestionHeading] = useState("");
  const [score, setScore] = useState("");
  const [multipleInputs, setmultipleInputs] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const response = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.put(
        `/api/v1/admin/updateQuestions/${id}`,
        {
          questionType: "multiple",
          heading: questionHeading,
          score: score,
          questionText,
          option1: multipleInputs.option1,
          option2: multipleInputs.option2,
          option3: multipleInputs.option3,
          option4: multipleInputs.option4,
          output: output,
        },
        config
      );
      if (data.success) {
        alert("Question Updated Successfully");
        history.push("/admin/AllQuestions")
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const handleChange = (e) => {
    setmultipleInputs({ ...multipleInputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    response();
  };
  const getQuestionDetails = async () => {
    const { data } = await axios.get(`/api/v1/admin/getQuestion/${id}`);
    setquestionText(data.multiple.questionText);
    setquestionHeading(data.multiple.heading);
    setScore(data.multiple.score);
    setoutput(data.multiple.output);
    setmultipleInputs({
      option1: data.multiple.option1,
      option2: data.multiple.option2,
      option3: data.multiple.option3,
      option4: data.multiple.option4,
    });
  };
  useEffect(() => {
    getQuestionDetails();
  }, []);
  return (
    <Fragment>
      <div className="multiple-question-container">
      <h1>Update Multiple Choice Question</h1>
        <div
          className="head"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "5%",
          }}
        >
          <div className="inputBox">
            <label>Heading:</label>
            <input
              type="text"
              required
              placeholder="Question Heading or Name"
              name="heading"
              value={questionHeading}
              onChange={(e) => setquestionHeading(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label>Score:</label>
            <input
              type="number"
              required
              placeholder="Question Marks"
              name="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
        </div>
        <div className="multiple-question-editor">
          <CKEditor
            editor={ClassicEditor}
            data={questionText}
            onChange={(e, editor) => setquestionText(editor.getData())}
          ></CKEditor>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-containerr">
            <div className="inputBox">
              <label>Option 1:</label>
              <input
                type="text"
                required
                placeholder="Option 1"
                name="option1"
                value={multipleInputs.option1}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Option 2:</label>
              <input
                type="text"
                required
                placeholder="Option 2"
                name="option2"
                value={multipleInputs.option2}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Option 3:</label>
              <input
                type="text"
                required
                placeholder="Option 3"
                name="option3"
                value={multipleInputs.option3}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Option 4:</label>
              <input
                type="text"
                required
                placeholder="Option 4"
                name="option4"
                value={multipleInputs.option4}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Correct Output:</label>
              <input
                type="text"
                required
                placeholder="Output"
                value={output}
                onChange={(e) => setoutput(e.target.value)}
              />
            </div>
            <div className="saveandnext">
              <input type="submit" value="UPDATE" />
              {/* <input type="button" value="NEXT" className="button-next" onClick={()=>setSteps((prevStep)=>prevStep+1)} /> */}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateMultipleQuestion;
