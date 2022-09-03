import React from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import './sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>HackMe</h1>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/AllQuestions">
        <p>
          <ListAltIcon />
          All Questions
        </p>
      </Link>
      <Link to="/admin/allusers">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/allstudents">
        <p>
          <PeopleIcon /> Students
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
