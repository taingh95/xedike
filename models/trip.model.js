const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    driverId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    }],
    locationFrom: {type: String, required: true},
    locationTo: {type: String, required: true},
    startTime: {type: Date, required: true},
    availableSeats: {type: Number, required: true},
    fee: {type: Number, required: true},
    isFinished: {type: Boolean, default:  false},
    passenger: [{
        passengerId: {type: mongoose.Schema.Types.ObjectId, ref:"User", require: true},
        numberOfBookingSeats: {type: Number, required: true}
    }]
})

const Trip = mongoose.model('Trip', TripSchema, 'trips');
module.exports = {
    Trip, TripSchema
}