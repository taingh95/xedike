const { Trip } = require("../../models/trip.model");
const { Driver } = require("../../models/driver.model");
const { User } = require("../../models/user.model");

//validator
const tripValidate = require("../../validation/validate-trip")


//get all trips
module.exports.getTrips = async (req, res) => {
  let perPage = 4;
  let page = req.params.page || 1;
  try {
    const foundTrip = await Trip.find({isFinished: false})
      .skip(perPage * page - perPage)
      .limit(perPage)
    const count = await Trip.count({isFinished: false});
    let pages = Math.ceil(count / perPage)
    return res.status(200).json({ foundTrip, pages });
  } catch (error) {
    res.status(400).json(error);
  }
};
//trip details
module.exports.tripInfo = (req, res) => {
  Trip.findById(req.params.tripId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err));
};

//create new trip
module.exports.createTrip = (req, res) => {
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;
  const { errors, isValid } = tripValidate.tripValidation({ locationFrom, locationTo, startTime, availableSeats, fee });
  if(!isValid) return res.status(400).json({errors})
  Driver.findOne({ userId: req.user.payload._id })
    .then(driver => {
      if (!driver) return Promise.reject({ error: "Driver does not exists" });
      // if(!driver.address) return Promise.reject({error: "Driver does has infomation. Please update your information"})
      if (driver.carInfo.length <= 0)
        return Promise.reject({
          error: "Driver does not have car. Please update your Information"
        });
      if (driver.onTheTrip === true)
        return Promise.reject({ error: "Driver is on the another trip now" });
      const driverId = driver.id;
      const trip = { ...req.body, driverId };
      const newTrip = new Trip(trip);
      return newTrip.save().then(success => {
        driver.onTheTrip = true;
        driver.currentTrip.push(newTrip._id);
        driver.save();
      });
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

//update trip
module.exports.updateTrip = (req, res) => {
  const tripId = req.params.tripId;
  const driverId = req.user.payload._id;

  Promise.all([Trip.findById(tripId), Driver.findOne({ userId: driverId })])
    .then(results => {
      const trip = results[0];
      const driver = results[1];
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (!driver) return Promise.reject({ error: "Driver not found" });
      if (!trip.driverId[0].equals(driver._id))
        return Promise.reject({ error: "No permission" });

      trip.locationFrom = req.body.locationFrom;
      trip.locationTo = req.body.locationTo;
      trip.availableSeats = req.body.availableSeats;
      trip.startTime = req.body.startTime;

      res.status(200).json(trip);
      return trip.save();
    })
    .catch(err => res.status(400).json(err));
};

//delete trip
module.exports.deleteTrip = (req, res) => {
  const tripId = req.params.tripId;
  const driverId = req.user.payload._id;

  Promise.all([
    Trip.findByIdAndDelete(tripId),
    Driver.findOne({ userId: driverId })
  ])
    .then(results => {
      const trip = results[0];
      const driver = results[1];

      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (!driver) return Promise.reject({ error: "Driver not found" });
      if (!trip.driverId[0].equals(driver._id))
        return Promise.reject({ error: "No permission" });
      driver.onTheTrip = false;
      driver.currentTrip.splice(0, 1);
      driver.save();
      return res.status(200).json(`Deleted ${trip}`);
    })
    .catch(err => res.status(400).json(err));
};

//filter trip
module.exports.filterTrip = (req,res) => {

}


// ======================================= book trip ===================================================
module.exports.bookTrip = (req, res) => {
  const tripId = req.params.tripId;
  const { numberOfBookingSeats } = req.body;
  const passengerId = req.user.payload._id;
  Promise.all([Trip.findById(tripId), User.findById(passengerId)])
    .then(results => {
      const trip = results[0];
      const passenger = results[1];
      console.log(passenger);
      if (!passenger) return Promise.reject({ error: "Passenger not found" });
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (passenger.onTheRoad === true)
        return Promise.reject({ error: "You were on the trip" });
      if (numberOfBookingSeats > trip.availableSeats)
        return Promise.reject({ errors: "Your booking is over limitation" });
      trip.availableSeats -= numberOfBookingSeats;
      trip.passenger.push({ passengerId, numberOfBookingSeats });
      passenger.onTheTrip = true;
      passenger.save();
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

module.exports.cancelBookTrip = (req, res) => {
  const tripId = req.params.tripId;
  const passengerId = req.user.payload._id;

  Promise.all([Trip.findById(tripId), User.findById(passengerId)])
    .then(results => {
      const trip = results[0];
      const passenger = results[1];
      if (!passenger) return Promise.reject({ error: "Passenger not found" });
      if (!trip) return Promise.reject({ error: "Trip not found" });

      trip.passenger.map((userBooked, key) => {
        if (userBooked.passengerId.equals(passenger._id)) {
          trip.availableSeats += userBooked.numberOfBookingSeats;
          return trip.passenger.splice(key, 1);
        }
      });
      passenger.onTheTrip = false;
      passenger.save();
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};
