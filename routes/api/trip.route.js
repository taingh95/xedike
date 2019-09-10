const express = require("express");
const tripController = require("../controllers/trip.controller");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

//get all trips
router.get("/find/:page", tripController.getTrips);
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
router.patch(
  "/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("driver"),
  tripController.updateTrip
);
//delete trip
router.delete(
  "/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("driver"),
  tripController.deleteTrip
);
//finish trip
router.patch(
  "/finish/:tripId",
  authMiddleware.authentication,
  authMiddleware.authorization("driver"),
  tripController.finishTrip
);

// ============= booking trip ===============
//booktrip
router.post(
  "/booktrip/:tripId",
  authMiddleware.authentication,
  tripController.bookTrip
);
//cancel
router.get(
  "/booktrip/:tripId",
  authMiddleware.authentication,
  tripController.cancelBookTrip
);


module.exports = router;
