import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import axios from "axios";
import CodingCard from "./CodingContainer/CodingCard";
import MultipleCard from "./MultipleContainer/MultipleCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetStudentSolutions = () => {
  const [soldata, setSolData] = useState();
  const [quesdata, setQuesData] = useState();
  const location = useLocation();
  const response = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/getAllsolutions/${location.state.data.id}`
      );
      setSolData(data);
    } catch (err) {
      alert(err.message);
    }
  };
  const response2 = async () => {
    try {
      const { data } = await axios.get(`/api/v1/admin/getAllQuestions`);
      setQuesData(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    response();
    response2();
  }, []);
  let score = 0;
  soldata &&
    soldata.coding.map((item) => {
      score += item.score;
    });
  soldata &&
    soldata.multiple.map((item) => {
      score += item.score;
    });
  console.log(quesdata);

  let totalscore = 0;
  quesdata &&
    quesdata.questions.map((item) => {
      totalscore += parseInt(item.score);
    });
  quesdata &&
    quesdata.multiple.map((item) => {
      totalscore += parseInt(item.score);
    });
  console.log(totalscore);
  return (
    <Fragment>
      <div
        className="users"
        style={{ paddingTop: "5%", marginRight: "auto", marginLeft: "auto" }}
      >
        <Sidebar />
        <div className="userListContainer">
          <div style={{display: "flex", justifyContent:"space-between", margin: "50px"}}>
            <h1 id="userListHeading">STUDENT SOLUTION</h1>
            <h1>{`Total Score : ${score}/${totalscore}`}</h1>
          </div>
          <div>
            {/* CODING   */}

            <div
              className="coding-sol-dash"
              style={{ margin: "50px", lineHeight: "30px" }}
            >
              <h2>Coding</h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Heading</h3>
                <h3>Language</h3>
                <h3>Code</h3>
                <h3>Score</h3>
              </div>
              {soldata &&
                soldata.coding.map((item, index) => {
                  return <CodingCard key={item._id} item={item} />;
                })}
            </div>
            {/* MULTIPLE */}
            <div
              className="multiple-sol-dash"
              style={{ margin: "50px", lineHeight: "30px" }}
            >
              <h2>Multiple Choice</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h3>Heading</h3>
                <h3>Option</h3>
                <h3>Score</h3>
              </div>
              {soldata &&
                soldata.multiple.map((item, index) => {
                  return <MultipleCard key={item._id} item={item} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GetStudentSolutions;
