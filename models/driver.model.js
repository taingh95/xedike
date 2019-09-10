const mongoose = require('mongoose');
const {carSchema} = require('./car.model')


const driverSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    address: {type: String, required: true},
    passportId: {type: String, required: true},
    mainJob: {type: String, required: true},
    passengersRates: {type: Number, default: 0},
    carInfo: [{
        type: carSchema
    }],
    isActive: false,
    tripSuccess: {type: Number, default: 0}
})

const Driver = mongoose.model('Driver', driverSchema, 'drivers');

module.exports = {
    driverSchema, Driver
}