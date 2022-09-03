import {
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
  CLEAR_STUDENT_ERRORS,
  REGISTER_STUDENT_FAIL,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_REQUEST,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  LOGOUT_STUDENT_SUCCESS,
  LOGOUT_STUDENT_FAIL,
} from "../constants/studentConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_STUDENT_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/loginStudent",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_STUDENT_SUCCESS,
      payload: data.student,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register =
  (name, collegeId, degree, branch, email, phoneNo, password, gender) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_STUDENT_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/registerStudent",
        { name, collegeId, degree, branch, email, phoneNo, password, gender },
        config
      );
      dispatch({
        type: REGISTER_STUDENT_SUCCESS,
        payload: data.student,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//load user
export const loadStudent = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_STUDENT_REQUEST,
    });
    const { data } = await axios.get("/api/v1/student");
    dispatch({
      type: LOAD_STUDENT_SUCCESS,
      payload: data.student,
    });
  } catch (error) {
    dispatch({
      type: LOAD_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.post("/api/v1/logoutStudent");
    dispatch({
      type: LOGOUT_STUDENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// clear erros
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_STUDENT_ERRORS,
  });
};
