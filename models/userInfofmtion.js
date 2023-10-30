const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var db = require("./db");
const userInformation = new Schema({
  fullName: String,
  email: String,
  address: String,
  avatar: String,
  birthday: Date,
  gender: Number,
  phone: Number,
  accountID: String,
});

module.exports = db.mongoose.model("userInformation", userInformation);
