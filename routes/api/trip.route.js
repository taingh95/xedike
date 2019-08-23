const express = require("express");
const tripController = require("../controllers/trip.controller");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

//get all trips
router.get("/", tripController.getTrips);
//trip details
router.get("/:tripId", tripController.tripInfo);

//create trip
router.post(
  "/create-trip",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  tripController.createTrip
);

//update trip
router.post(
  "/update-trip/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("driver"),
  tripController.updateTrip
);
//delete trip
router.post(
  "/delete-trip/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("driver"),
  tripController.deleteTrip
);

// ============= booking trip ===============
router.post(
  "/booktrip/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("passenger"),
  tripController.bookTrip
);

router.post(
  "/cancel-book-trip/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("passenger"),
  tripController.cancelBookTrip
);

module.exports = router;
