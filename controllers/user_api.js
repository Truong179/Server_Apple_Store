var loginModel = require("../models/user.model");

exports.Register = async (req, res, next) => {
  try {
    const userName = req.body["data"].userName;
    const checkName = await loginModel.User.findOne({ userName: userName });
    if (checkName) {
      return res.status(409).json({ error: "Tài khoản đã tồn tại" });
    }
    const users = new loginModel.User(req.body["data"]);
    await users.save();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const userName = req.body.email;
    const password = req.body.password;

    const checkUser = await loginModel.User.findOne({ userName: userName });
    if (checkUser) {
      checkUser.comparePassword(password, function (err, result) {
        if (result && !err) {
          console.log("Login successful");
          res.json(checkUser);
        } else {
          console.log("Mật khẩu không đúng");
          res.json({ error: "Mật khẩu không đúng" });
        }
      });
    } else {
      res.json({ error: "Tài khoản không tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async function (req, res, next) {
  await loginModel
    .find()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json(err));
};
