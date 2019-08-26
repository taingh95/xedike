import axios from "axios";

const getErrors = err => {
  return {
    type: "GET_ERRORS",
    payload: err
  };
};

const register = (user, history) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/users/register", user)
      .then(res => {
        console.log(res);
        getErrors({})
        history.push("/");
      })
      .catch(err => dispatch(getErrors(err.response.data.errors)));
  };
};





export default {
  register
};
