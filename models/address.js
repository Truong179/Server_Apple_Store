const mongoose = require('mongoose');
const Schema = mongoose.Schema;;
var db = require('./db');
const Address = new Schema(
    {
        name:String,
        phone:Number,
        address:String,
        userID:String
    }
)
module.exports = db.mongoose.model("Address", Address);