import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllQuestions = () => {
  const history = useHistory()
  const [codingQuestion, setCodingQuestions] = useState();
  const [multipleQuestion, setMultipleQuestions] = useState();

  const deleteQuestion = async (id) => {
    await axios.delete(`/api/v1/admin/deleteQuestions/${id}`);
    alert("Question Deleted Successfully");
  };

  const columns = [
    { field: "id", headerName: "Question ID", minWidth: 200, flex: 0.5 },

    {
      field: "questionType",
      headerName: "Question Type",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "heading",
      headerName: "Heading",
      minWidth: 400,
      flex: 0.3,
    },

    {
      field: "score",
      headerName: "Score",
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
                pathname: `/admin/updateQuestion/${params.getValue(
                  params.id,
                  "id"
                )}`,
                state: data,
              }}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() => deleteQuestion(params.getValue(params.id, "id"))}
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
    const { data } = await axios.get("/api/v1/admin/getAllQuestions");
    setCodingQuestions(data.questions);
    setMultipleQuestions(data.multiple);
  };
  useEffect(() => {
    response();
  }, [codingQuestion, multipleQuestion]);
  codingQuestion &&
    codingQuestion.forEach((item) => {
      rows.push({
        id: item._id,
        questionType: item.questionType,
        heading: item.heading,
        score: item.score,
      });
    });

  multipleQuestion &&
    multipleQuestion.forEach((item) => {
      rows.push({
        id: item._id,
        questionType: item.questionType,
        heading: item.heading,
        score: item.score,
      });
    });
  return (
    <Fragment>
      <div
        className="dashboard"
        style={{ paddingTop: "10%", marginRight: "auto", marginLeft: "auto" }}
      >
        <Sidebar />
        <div className="productListContainer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 id="productListHeading">ALL QUESTIONS</h1>
            <Link
              to="/admin/addQuestion"
              style={{
                textDecoration: "none",
                marginBottom: "10px",
                marginRight: "2%",
                border: "1px solid blue",
                color: "blue",
              }}
            >
              <Button>ADD QUESTION</Button>
            </Link>
          </div>

          <DataGrid
            sx={{ mr: "2%" }}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="questionListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AllQuestions;
