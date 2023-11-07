const { mongoose } = require("./db");

const AddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: mongoose.Schema.Types.Number, require: true },
    address: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "Address",
    timestamps: true,
  }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = { Address };
