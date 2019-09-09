import _ from "lodash";
import {
  SET_DRIVER_PROFILE
} from "../actions/constants/authType";

const initialState = {
  driver: {},
  loading: false
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVER_PROFILE:
      return {
        ...state,
        driver: action.payload
      };
    default:
      return state;
  }
};

export default driverReducer;
