import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import './Users.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {

    const [users,setUsers]=useState("");
    const deleteUser=async (id)=>{
      const {data}=await axios.delete(`/api/v1/admin/user/${id}`)
      if(data.success)
      {
        alert(data.message)
      }
      else
      {
        alert(data.message)
      }
    }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 240, flex: 0.5 },

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
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 170,
      flex: 0.5,
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
          <Fragment>
            <Link
              to={{
                pathname: `/admin/updateUser/${params.getValue(
                  params.id,
                  "id"
                )}`,
                state: data,
              }}
            >
              <EditIcon />
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

  const response = async () => {
    const { data } = await axios.get("/api/v1/admin/users");
    setUsers(data.users)
  };
  useEffect(() => {
    response();
  }, [users]);
  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
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
          <h1 id="userListHeading">ALL USERS</h1>

          <DataGrid
            sx={{ mr: "2%" }}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="userListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
