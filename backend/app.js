const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
let bodyParser = require('body-parser');
const cors = require("cors");
//allow using a .env file
require("dotenv").config();   

//creates a new instance of express application
const app = express();

// add cors header to the server
app.use(cors({
  origin: '*'
}));

// to send data by body --- Jahidul
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const primaryDataRoute  = require('./routes/primaryData');
const eventsDataRoute  = require('./routes/eventsData');
const organizationDataRoute  = require('./routes/organizationData');

//setup middle ware for routes
app.use('/primaryData', primaryDataRoute);
app.use('/eventData', eventsDataRoute)
app.use('/organizationData', organizationDataRoute)

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//displaying message that backend works 
app.get("/", (req, res) => { 
  res.status(200).send("Welcome to backend of project-cis-4339-project-24"); 
});