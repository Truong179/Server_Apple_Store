var loginModel = require("../models/user.model");
const bcrypt = require("bcrypt-nodejs");

exports.Register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const checkName = await loginModel.User.findOne({ email });
    if (checkName) {
      return res.json({ error: "Tài khoản đã tồn tại" });
    }
    const users = new loginModel.User(req.body);
    await users.save();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const checkUser = await loginModel.User.findOne({ email });
    if (checkUser) {
      checkUser.comparePassword(password, function (err, result) {
        if (result && !err) {
          console.log("Login successful");
          res.json({ _id: checkUser._id, role: checkUser.role });
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

exports.UpdatePass = async (req, res, next) => {
  if (req.method === "PUT") {
    try {
      const { oldPassword, newPassword } = req.body;
      const userToUpdate = await loginModel.User.findOne({
        _id: req.params.idUser,
      });

      userToUpdate.comparePassword(oldPassword, async function (err, result) {
        if (result && !err) {
          hashPassword(newPassword, async (err, hash) => {
            if (err) {
              return next(err);
            }
            userToUpdate.passWord = hash;
            await userToUpdate.save();

            console.log("Thay đổi mật khẩu thành công");
            res.json({ status: true, message: "Thay đổi mật khẩu thành công" });
          });
        } else {
          console.log("Mật khẩu không đúng");
          res.json({ status: false, message: "Mật khẩu không đúng" });
        }
      });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) {
        return callback(err);
      }
      callback(null, hash);
    });
  });
};
