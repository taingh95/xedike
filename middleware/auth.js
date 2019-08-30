const jwt = require("jsonwebtoken");
require("dotenv").config();

//xac that nguoi dung
module.exports.authentication = (req, res, next) => {
  const token = req.header("Authorization");
  const KEY = process.env.SECRET_KEY ;
  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token is invalid" });
  }
};

//phan quyen nguoi dung
module.exports.authorization = userTypeArray => {
  return (req, res, next) => {
    const { userType } = req.user.payload;
    let isAccess = Boolean;
    userType.map(user => {
      if (user.indexOf(userTypeArray) > -1) {
        isAccess = true
      } else {
        isAccess = false
      }
    });
    if(isAccess === true) {
        return next()
    } else {
        return res.status(400).json({errors: "No permission"})
    }
  };
};

