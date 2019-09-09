import {GET_ERRORS_TRIP} from '../actions/constants/authType'

const initialState = {}

const errorsTripReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS_TRIP:
            return action.payload;
        default:
            return state
    }
}

export default errorsTripReducer;