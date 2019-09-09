import {combineReducers} from 'redux'

import authReducer from './auth'
import errorsReducer from './errors'
import errorsTripReducer from './errors-trip'
import driverReducer from './driver-profile'


const rootReducer = combineReducers({
    auth : authReducer,
    errors: errorsReducer,
    driver: driverReducer,
    errorsTrip: errorsTripReducer
})

export default rootReducer;