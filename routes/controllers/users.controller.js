const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//const validator
const validate = require("../../validation/validate-register");
const validateForm = require("../../validation/validate-user-propfile")


//load model
const { User } = require("../../models/user.model");
const { Driver } = require("../../models/driver.model");
//========= =========
//List User access: public
module.exports.index = (req, res) => {
  User.find()
    .select("-_id")
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
  //   res.json("Day la GET request o router api/users/");
};
//Find User By Id
module.exports.userInformation = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) return res.status(400).json({ error: "User does not exists" });
      return res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
};
//User register
module.exports.register = async (req, res) => {
  const { email, passWord, fullName, phone, DOB } = req.body;
  const { isValid, errors } = await validate.validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json({ errors: errors });
  try {
    const newUser = new User({
      email,
      passWord,
      fullName,
      phone,
      DOB
    });
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.passWord, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err) throw err;
        newUser.passWord = hash;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => res.status(400).json(err));
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
///User login
module.exports.login = (req, res) => {
  const { email, passWord } = req.body;
  const { errors, isValid } = validate.validateLoginInput({ email, passWord });
  if (!isValid) return res.status(400).json({ errors });
  User.findOne({ email: email })
    .then(user => {
      if (!user)
        return res.status(400).json({ error: "User or Password is incorrect" });
      bcrypt.compare(passWord, user.passWord, (err, isMatch) => {
        if (!isMatch)
          return res
            .status(400)
            .json({ error: "User or Password is incorrect" });
        const payload = {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType,
          DOB: user.DOB,
          phone: user.phone,
          isOnTheTrip: user.onTheTrip,
          avatar: user.avatar || "",
        };
        const secretKey = process.env.SECRET_KEY;
        jwt.sign({ payload }, secretKey, { expiresIn: "2h" }, (err, token) => {
          if (err) return res.status(400).json({ error: err });
          res.status(200).json({ token: token, msg: "Login success" });
        });
      });
    })
    .catch(err => res.status(400).json(err));
};
//User upload-avatar
module.exports.uploadAvatar = (req, res) => {
  User.findById(req.user.payload._id)
    .then(user => {
      if (!user) return res.status(400).json({ errors: "User doesnt exists" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

//User edit information
module.exports.editInformation = (req, res) => {
  const { email, fullName, DOB, phone } = req.body;
  // const {isValid, errors} =  validateForm.updateUser(req.body)
  // if (!isValid) return res.status(400).json({ errors: errors });
  User.findById(req.user.payload._id)
    .then(user => {
      user.email = email;
      user.fullName = fullName;
      user.DOB = DOB;
      user.phone = phone;
      user
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
//Module change password
module.exports.changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  User.findById(req.user.payload._id).then(user => {
    if (!user) return res.status(400).json({ error: "User does not exists" });
    bcrypt.compare(currentPassword, user.passWord, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({ error: "Password is incorrect" });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.passWord = hash;
          user
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    });
  });
};

//User deactive their account
module.exports.deactiveAccount = (req, res) => {
  User.findByIdAndDelete({ _id: req.user.payload._id })
    .then(user => {
      if (!user) return Promise.reject({ errors: "User does not exists" });
      return user.userType.map(u => {
        if (u.length > 1) {
          Driver.findOneAndDelete({ userId: user._id })
            .then(driver => res.status(200).json(`Da xoa ${driver}`))
            .catch(err => res.status(400).json(err));
          return res.status(200).json(`Da xoa ${user}`);
        } else {
          return res.status(200).json(user);
        }
      });
    })
    .catch(err => res.status(400).json(err));
};

//Become a driver
module.exports.becomeDriver = (req, res) => {
  console.log(JSON.stringify(req.user.payload.userType));
  User.findById(req.user.payload._id)
    .then(user => {
      if (!user) return Promise.reject({ errors: " User does not exists" });
      let isAccess = Boolean;
      user.userType.map(u => {
        if (u.indexOf("driver") === -1) {
          isAccess = true;
        } else {
          isAccess = false;
        }
      });
      if (isAccess === true) {
        user.userType.push("driver");
        return user
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => res.status(400).json(err));
      } else {
        return res.status(400).json({ errors: "User was driver" });
      }
    })
    .catch(err => res.status(400).json(err));
};
