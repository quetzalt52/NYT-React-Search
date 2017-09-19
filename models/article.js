
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

var Article = mongoose.model("Article", articleSchema);
var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
