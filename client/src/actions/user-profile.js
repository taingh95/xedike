import {getErrors, setCurrentUser} from './auth'
import axios from "axios";
import swal from 'sweetalert';
import {logoutUser} from "./auth"



export const loadMyProfile = (id) => {
  return dispatch => {
    axios.get(`http://localhost:8080/api/users/${id}`).then(res => {
      dispatch(setCurrentUser(res.data))
    })
  }
}

export const updateUserProfile = (data, id) => {
    return dispatch => {
      axios
        .put('http://localhost:8080/api/users/update',data)
        .then(res => {
          dispatch(getErrors({}))
          swal("Success!!", "Your profile have been updated", "success")
          axios.get(`http://localhost:8080/api/users/${id}`).then(result => {
            dispatch(setCurrentUser(result.data))
          })
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
                swal("Success!!", "Your password have been updated", "success")
            })
            .catch(err => {
                dispatch(getErrors(err.response.data.errors || {error : err.response.data.error}))
            })
    }
}


export const becomeDriver = () => {
  return dispatch => {
    axios.post("http://localhost:8080/api/users/becomeDriver").then(res => {
        swal("Success!!", "Congrats, you are driver now. Relogin for continue", "success").then(result => {
          dispatch(logoutUser())
        })
    }).catch(err => {
      dispatch(getErrors(err.response.data))
    })
  }
}
