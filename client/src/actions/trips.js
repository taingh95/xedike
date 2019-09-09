import axios from "axios";
import swal from "sweetalert";
import {GET_ERRORS_TRIP} from './constants/authType'


export const getErrorsTrip = err => {
    return {
      type: GET_ERRORS_TRIP,
      payload: err
    };
  };



export const createTrip = (data,cb) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/trips/create-trip", data)
      .then(res => {
        swal("Congratulation!", "You were created your trip!", "success").then(success => {
            cb();
        })
        dispatch(getErrorsTrip({}))
      })
      .catch(err => {
          if(err.response.data.error) {
            return  swal("Failed!", `${err.response.data.error}`, "warning")
          } else {
           return dispatch(getErrorsTrip(err.response.data.errors))
          }
    });
  };
};
