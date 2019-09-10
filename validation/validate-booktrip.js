const validator = require('validator');
const _ = require('lodash');

module.exports.bookTripValidate = (data) => {
    let error = {}

    //seats
    if(validator.isEmpty(data.numberOfBookingSeats)) {
        error.numberOfBookingSeats = "Choose your number of booking seats"
    } 
    return {
        //isValid: true, errors la {}, isValid: false khi errors co thuoc tinh
        isValid: _.isEmpty(error),
        error
    }
}