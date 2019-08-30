const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport")
const apiUser = require("./routes/api/users.route");
const apiDriver = require("./routes/api/driver.route");
const apiTrip = require("./routes/api/trip.route");
const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017/xedike", { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"))
  .catch(console.log);

app.use("/", express.static("public"));
app.use("/uploads", express.static("uploads"));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,  Access-Control-Request-Headers, Authorization"
  );
  next();
});
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//middelware passport
app.use(passport.initialize())
require('./config/passport')(passport);

//router api
app.use("/api/users", apiUser);
app.use("/api/drivers", apiDriver);
app.use("/api/trips", apiTrip);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})


app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
