const validator = require('validator');
const _ = require('lodash');

module.exports.tripValidation = (data) => {
    let errors = {}

    //location-from
    if(validator.isEmpty(data.locationFrom)) {
        errors.locationFrom = "Location from is required"
    } 
    if(validator.isEmpty(data.locationTo)) {
        errors.locationTo = "Location to is required"
    } 

    //seats
    if(validator.isEmpty(data.availableSeats)) {
        errors.availableSeats = "Available Seats is required"
    } else if(!validator.isNumeric(data.availableSeats)) {
        errors.availableSeats = "Contains only number"
    }
    //fee
    if(validator.isEmpty(data.fee)) {
        errors.fee = "Fee is required"
    } else if (!validator.isNumeric(data.fee)) {
        errors.fee = "Contains only number"
    }
    //validator start time
    if(validator.isEmpty(data.startTime)) {
        errors.startTime = "Start time of the trip is required"
    } else if(!validator.isISO8601(data.startTime)) {
        errors.startTime = "Start time of the trip type is YYYY-MM-DD"
    }
    
    return {
        //isValid: true, errors la {}, isValid: false khi errors co thuoc tinh
        isValid: _.isEmpty(errors),
        errors
    }
}

