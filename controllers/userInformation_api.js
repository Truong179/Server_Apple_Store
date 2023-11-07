const userInformationModel = require("../models/userInfofmtion");
const Address = require("../models/address");

// Information
exports.getUserInforById = async (req, res, next) => {
  try {
    const idUser = req.query.idUser;

    const userInfor = await userInformationModel.UserInformation.find({
      accountID: idUser,
    });
    res.json({ status: true, message: userInfor[0] });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

exports.addUserInformation = async (req, res) => {
  try {
    const information = new userInformationModel.UserInformation(req.body);
    await information.save();
    res.status(200).send("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Address
exports.addAddress = async (req, res) => {
  try {
    console.log(req.body);
    const saveAddress = new Address(req.body);
    await saveAddress.save();
  } catch (error) {
    console.log(error);
  }
};
