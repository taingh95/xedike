const validator = require('validator');
const _ = require('lodash');

module.exports.updateUser = (data) => {
    let errors = {}

    //email
    if(validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    } 

    //phone
    if(validator.isEmpty(data.phone)) {
        errors.phone = "Phone is required"
    } 
    //validator fullName
    if(validator.isEmpty(data.fullName)) {
        errors.fullName = "Full name field is required"
    } 
    //validator DOB
    if(validator.isEmpty(data.DOB)) {
        errors.DOB = "Day of birth is required"
    } else if(!validator.isISO8601(data.DOB)) {
        errors.DOB = "Date of birth type is YYYY-MM-DD"
    }
    
    return {
        //isValid: true, errors la {}, isValid: false khi errors co thuoc tinh
        isValid: _.isEmpty(errors),
        errors
    }
}

