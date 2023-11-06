var loginModel = require("../models/user");

exports.Register = async (req, res, next) => {

    try {
        const email = req.body.email;
        console.log(req.body);
        const checkName = await loginModel.findOne({ email: email })
        if (checkName) {
            return res.status(409).json({ error: "Tài khoản đã tồn tại" })
        }
        const users = new loginModel(req.body);
        await users.save();
        res.json(users);

    } catch (error) {
        console.log(error);

  try {
    const userName = req.body.userName;
    const checkName = await loginModel.user_model.findOne({ userName: userName });
    if (checkName) {
      return res.status(409).json({ error: "Tài khoản đã tồn tại" });

    }
    const users = new loginModel(req.body);
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
        console.log(req.body)
        const checkUser = await loginModel.findOne({ email: userName })
        if (checkUser) {
            checkUser.comparePassword(password, function (err, result) {
                if (result && !err) {
                    console.log("Login successful")
                    res.status(200).json(checkUser)
                } else {
                    console.log("Mật khẩu không đúng")
                    res.status(409).json({ error: "Mật khẩu không đúng" })
                }
            })


  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async function (req, res, next) {
  await loginModel.user_model
    .find()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json(err));
};

