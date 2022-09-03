import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import Sidebar from "../../Sidebar/Sidebar";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const deleteUser = async (id) => {
    const { data } = await axios.delete(`/api/v1/admin/student/${id}`);
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "Student ID", minWidth: 240, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const data = {
          data: params.row,
        };
        return (
          <Fragment >
            <Link to={{
              pathname: "/admin/getStudentSolutions",
              state:data
            }}
            >
              <TelegramIcon style={{paddingTop: "5px"}}/>
            </Link>
            <Button
              onClick={() => deleteUser(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  const response = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/students");
      setStudents(data.students);
    } catch (err) {
      alert(err.data);
    }
  };
  useEffect(() => {
    response();
  }, [students]);

  students &&
    students.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
      });
    });
  return (
    <Fragment>
      <div
        className="users"
        style={{ paddingTop: "10%", marginRight: "auto", marginLeft: "auto" }}
      >
        <Sidebar />
        <div className="userListContainer">
          <h1 id="userListHeading">ALL STUDENTS</h1>

          <DataGrid
            sx={{ mr: "2%" }}
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Students;
