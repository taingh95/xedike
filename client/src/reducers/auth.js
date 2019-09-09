import _ from "lodash";
import {
  SET_CURRENT_USER, SET_DRIVER_PROFILE
} from "../actions/constants/authType";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
