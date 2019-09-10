const { Trip } = require("../../models/trip.model");
const { Driver } = require("../../models/driver.model");
const { User } = require("../../models/user.model");

//validator
const tripValidate = require("../../validation/validate-trip");
const bookTripValidation = require("../../validation/validate-booktrip")
//get all trips
module.exports.getTrips = async (req, res) => {
  let perPage = 4;
  let page = req.params.page || 1;
  try {
    const foundTrip = await Trip.find({ isFinish: false })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await Trip.count({ isFinish: false });
    let pages = Math.ceil(count / perPage);
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
  const { errors, isValid } = tripValidate.tripValidation({
    locationFrom,
    locationTo,
    startTime,
    availableSeats,
    fee
  });
  if (!isValid) return res.status(400).json({ errors });
  Driver.findOne({ userId: req.user.payload._id })
    .populate("userId")
    .then(driver => {
      if (!driver) return Promise.reject({ error: "Driver not found" });
      if (driver.userId.currentTrip.length > 0)
        return Promise.reject({ error: "You are on another trip" });
      const driverId = driver._id;
      const trip = { ...req.body, driverId };
      const newTrip = new Trip(trip);
      return newTrip.save().then(trip => {
        const tripId = trip._id;
        driver.userId.currentTrip.push({ tripId, position: "driver" });
        driver.userId.save();
        return res.status(200).json(trip);
      });
    })
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
      Trip.findByIdAndUpdate(trip._id, req.body).then(newTrip =>
        res.status(200).json({ msg: "Updated Success!!" })
      );
    })
    .catch(err => res.status(400).json({ error: err }));
};

//delete trip
module.exports.deleteTrip = (req, res) => {
  const tripId = req.params.tripId;
  const driverId = req.user.payload._id;

  Promise.all([
    Trip.findByIdAndDelete(tripId),
    Driver.findOne({ userId: driverId }).populate("userId")
  ])
    .then(results => {
      const trip = results[0];
      const driver = results[1];
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (!driver) return Promise.reject({ error: "Driver not found" });
      if (!trip.driverId[0].equals(driver._id))
        return Promise.reject({ error: "No permission" });
      trip.passenger.map(one => {
          User.findById(one.passengerId)
              .then(user => {
                user.currentTrip.splice(0,1);
                user.save()
              })
        })
      driver.userId.currentTrip.splice(0, 1);
      driver.userId.save();
      return res.status(200).json(`Deleted ${trip}`);
    })
    .catch(err => res.status(400).json(err));
};

//finish trip
module.exports.finishTrip = (req, res) => {
  const tripId = req.params.tripId;
  const driverId = req.user.payload._id;
  Promise.all([
    Trip.findByIdAndUpdate(tripId, { isFinish: true }),
    Driver.findOne({ userId: driverId }).populate("userId")
  ])
    .then(results => {
      const driver = results[1];
      const trip = results[0];
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (!trip.driverId[0].equals(driver._id))
        return Promise.reject({ error: "No permission" });
      trip.passenger.map(one => {
        User.findById(one.passengerId)
            .then(user => {
              user.currentTrip.splice(0,1);
              user.save()
            })
      })
      driver.userId.currentTrip.splice(0, 1);
      driver.userId.save();
      return res.status(200).json({ msg: "Trip is finished!" });
    })
    .catch(err => res.status(400).json(err));
};

// ======================================= book trip ===================================================
module.exports.bookTrip = (req, res) => {
  const tripId = req.params.tripId;
  const { numberOfBookingSeats } = req.body;
  const passengerId = req.user.payload._id;
  const {error ,isValid} = bookTripValidation.bookTripValidate({numberOfBookingSeats})
  if (!isValid) return res.status(400).json({ error });
  Promise.all([Trip.findById(tripId), User.findById(passengerId)])
    .then(results => {
      const trip = results[0];
      const passenger = results[1];
      if (!passenger) return Promise.reject({ error: "Passenger not found" });
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (passenger.currentTrip.length > 0)
        return Promise.reject({ error: "You were on another the trip" });
      if (numberOfBookingSeats > trip.availableSeats)
        return Promise.reject({ error: "Your booking is over limitation" });
      if (trip.isFinish === true)
        return Promise.reject({ error: "This trip was finished" });
      trip.availableSeats -= numberOfBookingSeats;
      trip.passenger.push({ passengerId, numberOfBookingSeats });
      passenger.currentTrip.push({ tripId, position: "passenger" });
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
      passenger.currentTrip.splice(0, 1);
      passenger.save();
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

