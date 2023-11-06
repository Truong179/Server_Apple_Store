const userInformationModel = require("../models/userInfofmtion");

exports.getUserInforById = async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
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
