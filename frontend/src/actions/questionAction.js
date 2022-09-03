import {
  CODING_QUESTION_REQUEST,
  CODING_QUESTION_SUCCESS,
  CODING_QUESTION_FAIL,
  MULTIPLE_QUESTION_REQUEST,
  MULTIPLE_QUESTION_SUCCESS,
  MULTIPLE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";

import axios from "axios";

export const newCodingQuestion = (questionType,heading,level,score,codeText,input,output) => async (dispatch) => {
  try {
    dispatch({ type: CODING_QUESTION_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/codingquestions`,
      { questionType, heading, level, score, codeText, input, output },
      config
    );

    dispatch({
      type: CODING_QUESTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CODING_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};