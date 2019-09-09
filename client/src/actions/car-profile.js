import axios from "axios";
import swal from 'sweetalert';



export const createNewCar = (data, driverId) => {
    return dispatch => {
        axios
        .post(
          `http://localhost:8080/api/drivers/${driverId}/update-new-cars`,
          data
        )
        .then(swal("Success!", "Your car information was upgrade!", "success").then(result => {
            window.location.reload()
        }))
        .catch(console.log);
    }
}

export const updateYourCar = (data,carId) => {
    return dispatch => {
        axios
        .patch(
          `http://localhost:8080/api/drivers/update-car/${carId}`,
          data
        )
        .then(swal("Success!", "Your car information was upgrade!", "success").then(result => {
            window.location.reload()
        }))
        .catch(console.log);
    }
}