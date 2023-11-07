const express = require("express");
const router = express.Router();

const userInformationAPI = require("../controllers/userInformation_api");

// Infomation
router.get("/", userInformationAPI.getUserInforById);
router.post("/", userInformationAPI.addUserInformation);

// Address
router.get("/address/saveAddress", userInformationAPI.addAddress);

module.exports = router;
