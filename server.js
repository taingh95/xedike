const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const passport = require("passport")


//auth


const app = express();

const apiUser = require('./routes/api/users.route')
const apiDriver = require('./routes/api/driver.route')
const apiTrip = require('./routes/api/trip.route')

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
mongoose
  .connect("mongodb://localhost:27017/xedike", { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"))
  .catch(console.log);
//middleware bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
//middelware passport
app.use(passport.initialize());
require('./config/passport')
// app.use('/', express.static('public'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,fingerprint");
  next();
});

//router api
app.use('/api/users', apiUser)
app.use('/api/drivers', apiDriver)
app.use('/api/trips', apiTrip)

//static uploads
app.use('/uploads', express.static('uploads'))