'use strict'
const validator = require('validator');
const _ = require('lodash');
const {User} = require('../models/user.model')




module.exports.validateRegisterInput = async (data) => {
    let errors = {}

    //validator email
    if(validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    } else {
        const user = await User.findOne({email : data.email})
        if(user) errors.email = "Email is exists"
    }
    //validator passWord
    if(validator.isEmpty(data.passWord)) {
        errors.passWord = "Password is required"
    } else if(!validator.isLength(data.passWord, {min: 6 , max : 28})) {
        errors.passWord = "Password has least 6 characters and max 28 characters"
    }

    //validator passWord2
    if(validator.isEmpty(data.passWord2)) {
        errors.passWord2 = "Confirm password is required"
    } else if(data.passWord !== data.passWord2) {
        errors.passWord2 = "Password confirm is not match"
    }
    //validator phone
    if(validator.isEmpty(data.phone)) {
        errors.phone = "Phone is required"
    } else {
        const user = await User.findOne({phone: data.phone});
        if(user) errors.phone = "Phone is exists"
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

//validator login
module.exports.validateLoginInput =  (data) => {
    let errors = {};

    data.email = _.get(data, 'email', '')
    data.passWord = _.get(data, 'passWord', '')


    //validator email
    if(validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }  else if(!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }
    //validator passWord
    if(validator.isEmpty(data.passWord)) {
        errors.passWord = "Password is required"
    }
    return {
        isValid: _.isEmpty(errors),
        errors
    }
}