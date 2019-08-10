const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


const app = express();

const apiUser = require('./routes/api/users.route')



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
app.use('/uploads', express.static('uploads'))

//router api
app.use('/api/users', apiUser)