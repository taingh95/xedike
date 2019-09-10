import axios from "axios";
import swal from "sweetalert";
import {GET_ERRORS_TRIP} from './constants/authType'


export const getErrorsTrip = err => {
    return {
      type: GET_ERRORS_TRIP,
      payload: err
    };
  };


//driver
export const createTrip = (data,cb) => {
  return dispatch => {
    axios
      .post("http://localhost:8080/api/trips/create-trip", data)
      .then(res => {
        swal("Congratulation!", "You were created your trip!", "success").then(success => {
            cb();
            window.location.reload()
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

export const deleteTrip = (tripId, cb) => {
  return dispatch => {
    axios.delete(`http://localhost:8080/api/trips/${tripId}`)
         .then(res => {
           swal("Success!", "Your trip was deleted!", 'success').then(suc => {
             cb();
             window.location.reload();
           })
         })
  }
}

export const finishTrip = (tripId, cb) => {
  return dispatch => {
    axios.patch(`http://localhost:8080/api/trips/finish/${tripId}`)
          .then(res => {
            swal("Success!", "Your trip was finish!", 'success').then(suc => {
              cb();
              window.location.reload();
            })
          })
  }
}





//passenger
export const cancelTrip = (tripId, cb) => {
  return dispatch => {
      axios.get(`http://localhost:8080/api/trips/booktrip/${tripId}`)
            .then(res => {
              swal("Success!", "You was cancel booking the trip", 'success').then(suc => {
                cb();
                window.location.reload();
              }) 
            })
  }
}

export const bookTrip = (tripId, data, cb) => {
  return dispatch => {
    axios.post(`http://localhost:8080/api/trips/booktrip/${tripId}`, data)
          .then(res => {
            swal("Success!", "You was  booking the trip", 'success').then(suc => {
              cb()
              window.location.reload();
            }) 
          })
          .catch(err => {
            console.log(err.response.data.error.numberOfBookingSeats)
            return swal("Failed!", `${err.response.data.error.numberOfBookingSeats || err.response.data.error}`, "warning")
          })
  }
}