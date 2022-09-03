import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Dashboard.css";
import axios from "axios";
const Dashboard = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const response1 = async () => {
    const { data } = await axios.get("/api/v1/admin/getAllQuestions");
    setTotalQuestions(data.questions.length + data.multiple.length);
    localStorage.setItem("codingQuestion",parseInt(data.questions.length))
    localStorage.setItem("multipleQuestion",parseInt(data.multiple.length))
  };
  const response2 = async () => {
    const { data } = await axios.get("/api/v1/admin/users");
    setTotalUsers(data.users.length)
  };
  const response3 = async () => {
    const { data } = await axios.get("/api/v1/admin/students");
    setTotalStudents(data.students.length)
  };
  useEffect(() => {
    response1();
    response2();
    response3();
  }, [totalQuestions,totalUsers,totalStudents]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalQuestions],
      },
    ],
  };

  const doughnutState = {
    labels: ["No Question", "No Of Questions"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [0, totalQuestions],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <div style={{display: 'flex',justifyContent: 'space-between',marginLeft:'2.5%',marginRight:'2.5%'}}>
        <h1>Dashboard</h1>
        <Link to="/studentTest" style={{textDecoration:"none"}}><Button variant="contained">TEST LINK</Button></Link>
        </div>
        <div className="dashboardSummary">
          <div>
            <p>{/* Total Amount <br /> ₹ {totalAmount} */}</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/AllQuestions">
              <p>Questions</p>
              <p>{totalQuestions}</p>
            </Link>
            <Link to="/admin/allusers">
              <p>Users</p>
              <p>{totalUsers}</p>
            </Link>
            <Link to="/admin/allusers">
              <p>Students</p>
              <p>{totalStudents}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
