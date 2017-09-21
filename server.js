// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//const logger = require("./routes");

// Require Article Schema
const Article = require("./models/article");

// Create Instance of Express
const app = express();

// Sets a port
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
//app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static("client/build"));
// Add routes, both API and view
//app.use(routes);
// -------------------------------------------------
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// MongoDB Configuration
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
     useMongoClient: true
  }
);


// Listener
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
