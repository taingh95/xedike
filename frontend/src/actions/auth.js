import axios from "axios";
import { toast } from "react-toastify";

import {GET_ERRORS, SET_CURRENT_USER} from './constants/authType'


import jwtDecode from 'jwt-decode'
import getFingerprint from '../helper/getFingerprint'


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
    .then(success => toast.success("Chúc mừng bạn đã đăng ký thành công!! Quay Về Trang Chủ", {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => {
        history.push("/")
      },

    }))
    .catch(err => dispatch(getErrors(err.response.data.errors)));
  }
};

export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export const login = (data, history) => {
  const {email, password} = data
  return dispatch => {
    getFingerprint(fingerprint => {
      axios.post("http://localhost:8080/api/users/login", {email,password,fingerprint})
            .then(res => {
              const token = res.data.token;
              localStorage.setItem("token", token);
              const decoded = jwtDecode(token)
              dispatch(setCurrentUser(decoded));
                
              dispatch(getErrors({}));
            }).then(success => {
              toast.success("Chúc mừng bạn đã đăng nhập thành công!!", {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                  history.goback();
                }
              })
            }).catch(err => dispatch(getErrors(err.response.data.errors)))
    })
  }
}
