var express = require("express");
var router = express.Router();

var loginAPI = require("../controller/user_api");

router.post("/signup", loginAPI.Register);
router.post("/signIn", loginAPI.Login);

router.get("/getUser", loginAPI.getUser);
module.exports = router;
