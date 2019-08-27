import axios from "axios";
import { toast } from "react-toastify";

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
        console.log(res);
        dispatch(getErrors({}));
      })
      .then(success =>
        toast.success("Chúc mừng bạn đã đăng ký thành công!!", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            history.push("/login");
          }
        })
      )
      .catch(err => dispatch(getErrors(err.response.data.errors)));
  };
};


export const login = (data, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/users/login", { data })
      .then(res => {
        console.log(res.data);
        const token = res.data;
        localStorage.setItem("token", token);
        setHeader(token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
      })
      .then(success => {
        toast.success("Chúc mừng bạn đã đăng nhập thành công!!", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            history.goback();
          }
        });
      })
      .catch(err => dispatch(getErrors(err.response.data.errors)));
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
  }
}

//log out
export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem("token");
    setHeader(false);
    dispatch(setCurrentUser({}));
  }
}