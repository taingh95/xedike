const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passWord: {type: String, required: true},
    fullName: {type: String, required: true},
    userType: {type: [String], default: "passenger",required: true},
    phone: {type: Number, required: true, unique: true},
    DOB: {type: Date, required: true},
    registerDate: {type: Date, default: new Date().getTime()},
    numberOfTrips: {type: Number, default: 0},
    avatar: {type: String},
    history: [],
    onTheTrip : {type: Boolean, default: false}
})

const User = mongoose.model('User', UserSchema, 'users');
module.exports = {
    User, UserSchema
}