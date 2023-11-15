const { mongoose } = require("./db");

const userInformationSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  address: { type: String, required: false },
  avatar: { type: String, required: false },
  birthday: { type: String, required: false },
  phone: { type: mongoose.Schema.Types.Number, required: false },
  accountID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserInformation = mongoose.model(
  "UserInformation",
  userInformationSchema
);

module.exports = { UserInformation };
