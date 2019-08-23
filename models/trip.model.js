const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    driverId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    }],
    locationFrom: String,
    locationTo: String,
    startTime: {type: Date, required: true},
    availableSeats: Number,
    fee: Number,
    isFinished: Boolean,
    passenger: [{
        passengerId: {type: mongoose.Schema.Types.ObjectId, ref:"User", require: true},
        numberOfBookingSeats: {type: Number, required: true}
    }]
})

const Trip = mongoose.model('Trip', TripSchema, 'trips');
module.exports = {
    Trip, TripSchema
}