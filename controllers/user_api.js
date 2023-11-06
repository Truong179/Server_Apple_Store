const userModel = require("../models/user.model.js");

exports.register = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const existingUser = await userModel.User.findOne({ userName });

    if (existingUser) {
      return res.status(409).json({ error: "Tài khoản đã tồn tại" });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    const user = await userModel.User.findOne({ userName });

    if (user) {
      user.comparePassword(passWord, (err, result) => {
        if (result && !err) {
          console.log("Đăng nhập thành công");
          res.status(200).json(user);
        } else {
          console.log("Mật khẩu không đúng");
          res.status(409).json({ error: "Mật khẩu không đúng" });
        }
      });
    } else {
      res.status(409).json({ error: "Tài khoản không tồn tại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
