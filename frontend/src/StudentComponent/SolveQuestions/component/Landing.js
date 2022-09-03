import React, { useState, useEffect } from "react";
import { languageOptions } from "../constants/languageOptions";
import CodeEditor from "./CodeEditor";
import { CustomInput } from "./CustomInput";
import { defineTheme } from "../lib/defineTheme";
import LanguageDropdown from "./LanguageDropdown";
import ThemeDropDown from "./ThemeDropDown";
import OutputWindow from "./OutputWindow";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Landing.css";
import { useHistory } from "react-router-dom";
const javascriptDefault = 'console.log("Hello world!");';
const Landing = ({ quesData }) => {
  const history = useHistory();
  const [theme, setTheme] = useState("cobalt");
  const [processing, setProcessing] = useState(false);
  const [code, setCode] = useState(javascriptDefault);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const onSelectChange = (sl) => {
    setLanguage(sl);
  };
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const response = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let st1=quesData.questions.output
    let st2=output
    const { data } = await axios.post(
      `/api/v1/codingsolution/${quesData.questions._id}`,
      {
        questionType: "coding",
        heading: quesData.questions.heading,
        score: st1.trim()==st2.trim() ?  quesData.questions.score:0,
        codeText: code,
        language: language.name,
        questionId: quesData.questions._id,
      },
      config
    );
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", wait: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "716333d283msh695140af9a7e07bp1b91e8jsn473a73d41d94",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let status = err.response.status;
        if (status === 429) {
          showErrorToast(`Quota of 100 requests exceeded for the Day`, 10000);
        }
        setProcessing(false);
      });
    response();
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "716333d283msh695140af9a7e07bp1b91e8jsn473a73d41d94",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };
  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  const handleSubmit = () => {
    response();
    toast.success("Submitted Successfully!");
  };
  const handleNext = () => {
    response();
    history.push({
      pathname: "/solveQuestions",
      state: { quesid: quesData.questions._id },
    });
  };
  return (
    <div className="BoxContainer">
      <div className="bodyContainer">
        <div
          style={{
            display: "flex",
            marginBottom: "5px",
            textAlign: "center",
            padding: "5px",
          }}
        >
          <LanguageDropdown
            language={language}
            onSelectChange={onSelectChange}
          />
          <ThemeDropDown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main">
        <div className="left-container">
          <CodeEditor
            className="codeEditor"
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className="right-container">
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          <OutputWindow outputDetails={outputDetails} output={output} setOutput={setOutput}/>
          <button
            onClick={handleCompile}
            disabled={!code}
            className="landingButton"
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </button>
          <button onClick={handleSubmit} className="landingButton">
            SUBMIT
          </button>
          <button onClick={handleNext} className="landingButton">
            NEXT
          </button>
          {outputDetails && (
            <div className="metrics-container mt-4 ml-5 flex flex-col space-y-3">
              <p className="text-sm">
                Status:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.status?.description}
                </span>
              </p>
              <p className="text-sm">
                Memory:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.memory}
                </span>
              </p>
              <p className="text-sm">
                Time:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {outputDetails?.time}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
