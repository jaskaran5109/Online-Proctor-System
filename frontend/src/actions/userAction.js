import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL} from '../constants/userConstants'
import axios from 'axios'

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({
          type: LOGIN_REQUEST,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
          "/api/v1/login",
          { email, password },
          config
        );
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user,
        });
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const register = (name,email,password) => async (dispatch) => {

    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/register",{name,email,password}, config);
      console.log(data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  //load user
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
      const { data } = await axios.get("/api/v1/me");
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //logout User
  export const logout = () => async (dispatch) => {
    try {
      await axios.post("/api/v1/logout");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // clear erros
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };