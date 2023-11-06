const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var db = require("./db");
var bcrypt = require("bcrypt-nodejs");
const user = new Schema({
  userName: String,
  passWord: String,
  Token: String,
  role: { type: String, enum: ["Shop", "User"] },
  favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }]
});

user.pre("save", function (next) {
  var user = this;
  if (this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.passWord, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.passWord = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

user.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.passWord, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
let user_model = db.mongoose.model("user", user);
module.exports = {user_model};
