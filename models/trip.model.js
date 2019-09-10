const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    driverId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    }],
    locationFrom: {type: String},
    locationTo: {type: String},
    startTime: {type: Date},
    availableSeats: {type: Number},
    fee: {type: Number},
    isFinish: {type: Boolean, default:  false},
    passenger: [{
        passengerId: {type: mongoose.Schema.Types.ObjectId, ref:"User", require: true},
        numberOfBookingSeats: {type: Number, required: true}
    }]
})

const Trip = mongoose.model('Trip', TripSchema, 'trips');
module.exports = {
    Trip, TripSchema
}