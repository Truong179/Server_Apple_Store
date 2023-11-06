const express = require("express");
const router = express.Router();

const userInformationAPI = require("../controllers/userInformation_api");

// Infomation
router.get("/:idUser", userInformationAPI.getUserInforById);
router.post("/", userInformationAPI.addUserInformation);

module.exports = router;
