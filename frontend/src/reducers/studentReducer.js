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
  
  export const studentReducer = (state = { student: {} }, action) => {
    switch (action.type) {
      case LOGIN_STUDENT_REQUEST:
      case REGISTER_STUDENT_REQUEST:
      case LOAD_STUDENT_REQUEST:
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
        };
      case LOGIN_STUDENT_SUCCESS:
      case REGISTER_STUDENT_SUCCESS:
      case LOAD_STUDENT_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          student: action.payload,
        };
      case LOGOUT_STUDENT_SUCCESS:
        return {
          loading: false,
          student: action.payload,
          isAuthenticated: false,
        };
      case LOGOUT_STUDENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGIN_STUDENT_FAIL:
      case REGISTER_STUDENT_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          student: null,
          error: action.payload,
        };
      case LOAD_STUDENT_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          student: null,
          error: action.payload,
        };
      case CLEAR_STUDENT_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  