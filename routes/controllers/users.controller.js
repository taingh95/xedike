const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//load model
const { User } = require("../../models/user.model");

//========= =========
//List User access: public
module.exports.index = (req, res) => {
  User.find()
    .select({ fullName: 1, userType: 1, registerDate: 1, numberOfTrips: 1 })
    .then(user => res.status(200).json(user))
    .catch(console.log);
  //   res.json("Day la GET request o router api/users/");
};
//Find User By Id
module.exports.userInformation = async (req, res) => {
  await User.findById(req.path.split(":")[1]);
  if (!user) return res.status(400).json({ error: "User does not exists" });
  res.status(200).json(user);
};

//User register
module.exports.register = (req, res) => {
  const { email, passWord, fullName, phone, DOB } = req.body;
  User.findOne({ $or: [{ email }, { phone }] })
    .then(user => {
      if (user) return res.status(400).json({ error: "Email or Phone exists" });
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
            .catch(console.log);
        });
      });
    })
    .catch(console.log);
};
///User login
module.exports.login = (req, res) => {
  const { email, passWord } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ error: "Email does not exists" });

    bcrypt
      .compare(passWord, user.passWord)
      .then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ error: "Password was wrong" });
        const payload = {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType,
          DOB: user.DOB,
          phone: user.phone
        };
        const secretKey = process.env.SECRET_KEY;
        jwt.sign({ payload }, secretKey, function(err, token) {
          if (err) return res.status(400).json({ error: err });
          return res.status(200).json({ token, msg: "Login success" });
        });
      })
      .catch(err => res.status(400).json(err));
  });
};
//User upload-avatar
module.exports.uploadAvatar = (req, res) => {
  console.log(req.user.payload.id);
  User.findById(req.user.payload.id)
    .then(user => {
      if (!user) return res.status(400).json({ errors: "User doesnt exists" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(console.log);
};

//User edit information
module.exports.editInformation = (req, res) => {
  const { email, fullName, passWord, DOB, phone } = req.body;
  User.findById(req.user.payload.id)
    .then(user => {
      user.email = email;
      user.fullName = fullName;
      user.passWord = passWord;
      user.DOB = DOB;
      user.phone = phone;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.passWord, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) throw err;
          user.passWord = hash;
          user
            .save()
            .then(user => res.status(200).json(user))
            .catch(console.log);
        });
      });
    })
    .catch(console.log);
};
//User deactive their account
module.exports.deactiveAccount = (req, res) => {
  User.findByIdAndDelete({ _id: req.user.payload.id })
    .then(user => {
      if (!user) return Promise.reject({ errors: "User does not exists" });

      return res.status(200).json(`Da xoa ${user}`);
    })
    .catch(err => res.status(400).json(err));
};
