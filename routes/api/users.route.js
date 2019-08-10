const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authMiddleware = require("../../middleware/auth");
const upload = require("../../middleware/upload-images")



//Get list user, access: public
router.get("/", userController.index);
//Find User by Id, access: public
router.get('/:id', userController.userInformation);


router.post("/register", userController.register);
router.post("/login", userController.login);
//User upload avatar, access: private
router.post(
  "/upload-avatar",
  authMiddleware.authentication,
  upload.single("avatar"),
  userController.uploadAvatar
);
router.put("/update", authMiddleware.authentication ,userController.editInformation)
router.post('/deactive', authMiddleware.authentication,userController.deactiveAccount)


module.exports = router;
