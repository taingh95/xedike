import {getErrors} from './auth'
import axios from "axios";
import swal from 'sweetalert';

export const updateUserProfile = (data) => {
    return dispatch => {
      axios
        .put('http://localhost:8080/api/users/update',data)
        .then(res => {
          dispatch(getErrors({}))
          swal("Success!!", "Your profile have been updated", "success")
        })
        .catch(err => {
          dispatch(getErrors(err.response.data.errors || {error: err.response.data.error}))
        });
    };
  };

export const changePassword = data => {
    return dispatch => {
        axios.put("http://localhost:8080/api/users/change-password", data)
            .then(res => {
                dispatch(getErrors({}));
                console.log(res)
                swal("Success!!", "Your password have been updated", "success")
            })
            .catch(err => {
                dispatch(getErrors(err.response.data.errors || {error : err.response.data.error}))
            })
    }
}
