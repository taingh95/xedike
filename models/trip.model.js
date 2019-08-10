const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    driverId: {type: String},
    locationFrom: String,
    locationTo: String,
    startTime: {type: Date, default: new Date().getTime()},
    availableSeats: Number,
    fee: Number,
    isFinished: Boolean
})

const Trip = mongoose.model('Trip', UserSchema, 'trips');
module.exports = {
    Trip, TripSchema
}