const mongoose = require('mongoose');
const Schema = mongoose.Schema;;
var db = require('./db');
var bcrypt = require('bcrypt-nodejs');
const user = new Schema(
    {
        email:String,
        password:String,
        Token:String,
        phone:Number,
        role:{type:String, enum:["Shop", "User"]},
    }
)

user.pre('save', function (next) {
      var user = this;
      if ( this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
              return next(err);
            }
            user.password = hash;
            next();
          });
        });
      } else {
        return next();
      }
    });
    
    user.methods.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
      });
    };
    
let user_model = db.mongoose.model("user", user);
module.exports = {user_model};