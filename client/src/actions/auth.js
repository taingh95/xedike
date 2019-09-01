import axios from "axios";
import swal from 'sweetalert';


import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./constants/authType";

import jwtDecode from "jwt-decode";
import setHeader from "../helper/setHeader";

export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  };
};

export const register = (user, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/users/register", user)
      .then(res => {
        dispatch(getErrors({}));
        swal("Success!!", "You have successfully registered", "success").then(result => {
          history.push("/");
        })
      })
      .catch(err => dispatch(getErrors(err.response.data.errors)));
  };
};

export const login = (user, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/users/login", user)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setHeader(token);
        const decoded = jwtDecode(token);
        console.log(decoded.payload)
        dispatch(setCurrentUser(decoded.payload));
        dispatch(getErrors({}))
        swal("Login Success!!", "Wellcome to SharingCar!!", "success").then(result => {
          history.goBack();
        })
      })
      .catch(err => dispatch(getErrors(err.response.data.errors || {error : err.response.data.error})));
  };
};


export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//log out
export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem("token");
    setHeader(false);
    dispatch(setCurrentUser({}));
    window.location.href="http://localhost:3000/"
  };
};
