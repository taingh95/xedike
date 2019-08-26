import {combineReducers} from 'redux'

import authReducer from './auth'
import errorsReducer from './errors'


const rootReducer = combineReducers({
    auth : authReducer,
    errors: errorsReducer
})

export default rootReducer;