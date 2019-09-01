// import {getErrors} from './auth'
import axios from "axios";
import swal from 'sweetalert';


export const createDriverProfile = (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/drivers/create-profile", data ).then(res => {
        swal("Success!", "Your information was upgrade.", "success")
    }).catch(err => {console.log(err)})
    }
}

export const updateDriverProfile = (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/drivers/update-driver", data).then(res => {
            swal("Success!", "Your information was upgraded", "success")
        }).catch(err => {console.log(err)})
    }
}