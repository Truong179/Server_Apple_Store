const { mongoose } = require("./db");

const userInformationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  avatar: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: mongoose.Schema.Types.Number, required: true },
  phone: { type: mongoose.Schema.Types.Number, required: true },
  accountID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserInformation = mongoose.model(
  "UserInformation",
  userInformationSchema
);

module.exports = { UserInformation };
