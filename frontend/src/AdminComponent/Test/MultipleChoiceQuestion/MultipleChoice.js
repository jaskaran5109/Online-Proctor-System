import React, { Fragment, useState } from "react";
import "./MultipleChoiceQuestion.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const MultipleChoice = ({ questionType, setSteps, steps }) => {
  const history = useHistory();
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
      const { data } = await axios.post(
        `/api/v1/admin/multiplequestions`,
        {
          questionType,
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
        alert("Question added Successfully");
        setquestionText("");
        setquestionHeading("");
        setScore("");
        setoutput("");
        setmultipleInputs({
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        });
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
    if (steps == questionss-1) {
      history.push("/");
    }
    setSteps((prevStep) => prevStep + 1);
  };
  return (
    <Fragment>
      <div className="multiple-question-container">
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
              <input type="submit" value="SAVE & NEXT" />
              {/* <input type="button" value="NEXT" className="button-next" onClick={()=>setSteps((prevStep)=>prevStep+1)} /> */}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MultipleChoice;
