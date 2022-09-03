import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, createStyles } from "@mui/material";
const useStyles = styled((theme) => ({
  root: {
    "& div.react-grid-Container": {
      color: "red",
    },
  },
}));

const SolveAllQuestionList = ({ setonClickAll, setonClickQuestion ,capture}) => {

  let el = document.documentElement;
  const classes = useStyles();
  const [codingQuestion, setCodingQuestions] = useState();
  const [multipleQuestion, setMultipleQuestions] = useState();
  const columns = [
    // { field: "id", headerName: "Question ID", minWidth: 200, flex: 0.5 },
    {
      field: "heading",
      headerName: "Heading",
      minWidth: 500,
      flex: 0.3,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
    },
    {
      field: "questionType",
      headerName: "Question Type",
      minWidth: 100,
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
    },

    {
      field: "score",
      headerName: "Score",
      type: "number",
      headerClassName: "super-app-theme--header",
      headerAlign: "right",
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 200,
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
                pathname: `/solveSingleQuestions/${params.getValue(
                  params.id,
                  "id"
                )}`,
                state: data,
              }}
              style={{ textDecoration: "none" }}
              onClick={() => {
                setonClickAll(false);
                setonClickQuestion(true);
                // capture()
                el.requestFullscreen();
              }}
            >
              <Button
                style={{
                  backgroundColor: "rgb(0, 180, 0)",
                  width: "100px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Solve
              </Button>
            </Link>
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
    el.requestFullscreen && el.requestFullscreen();
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
    <div className={classes.root}>
      <DataGrid
        sx={{ mr: "2%", color: "white", border: "none" }}
        rows={rows}
        GridLinesVisibility="none"
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        hideFooterPagination
      />
    </div>
  );
};

export default SolveAllQuestionList;
