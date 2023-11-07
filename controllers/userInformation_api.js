const fs = require("fs");
const userInformationModel = require("../models/userInfofmtion");
const host = "192.168.0.110"; // Địa chỉ IP

// Information
exports.getUserInforById = async (req, res, next) => {
  try {
    const userInfor = await userInformationModel.UserInformation.find(
      req.query
    ).populate("accountID");

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
    res.json("success");
  } catch (err) {
    console.error(err);
    res.json({ error: "Lỗi server" });
  }
};

exports.updateUserInfo = async (req, res, next) => {
  if (req.method === "PUT") {
    const idInfo = req.params.idInfo;
    console.log(idInfo);

    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);

      const updatedInfo = {
        ...req.body,
        avatar: `http://${host}:3000/images/` + req.file.originalname,
      };

      const result =
        await userInformationModel.UserInformation.findByIdAndUpdate(
          idInfo,
          updatedInfo
        );
      res.json({ status: true, message: result });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};
