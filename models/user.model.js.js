const { mongoose } = require("./db");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    role: { type: String, enum: ["Shop", "User"], required: true },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const userInstance = this;
  if (this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(userInstance.passWord, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        userInstance.passWord = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.passWord, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
