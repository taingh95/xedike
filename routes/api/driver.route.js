const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const authMiddleware = require("../../middleware/auth");
const upload = require("../../middleware/upload-images");

router.post(
  "/create-profile",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  driverController.createProfile
);

router.get("/:userId", driverController.getDriverInfo);
router.get("/find/:driverId", driverController.getDriverInfoByDriverId)
router.post(
  "/update-driver",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  driverController.updateDriverInfo
);

router.post(
  "/:driverId/update-new-cars",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  upload.array("photos", 4),
  driverController.createNewCar
);

router.patch(
  "/update-car/:carId",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  upload.array("photos", 4),
  driverController.editCar
);

router.post(
  "/delete-car/:carId",
  authMiddleware.authentication,
  authMiddleware.authorization(["driver"]),
  driverController.deleteCar
);

module.exports = router;
