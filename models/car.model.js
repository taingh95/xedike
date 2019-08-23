const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    lisencePlate: {type: String, required: true},
    carImages: [{type: String, required: true}],
    numberOfSeats: {type: Number, required: true}
})

const Car = mongoose.model('Car', carSchema, 'cars');

module.exports = {
    Car, carSchema
}