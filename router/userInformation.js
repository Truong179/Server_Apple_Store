var express = require("express");
var router = express.Router();

const userInfofmtions = require("../controller/userInformation_api");

router.post("/addUserInformation", userInfofmtions.addUserInfor);

module.exports = router;
