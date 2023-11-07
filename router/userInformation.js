const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });

const userInformationAPI = require("../controllers/userInformation_api");

// Infomation
router.get("/", userInformationAPI.getUserInforById);
router.post("/", userInformationAPI.addUserInformation);
router.put(
  "/:idInfo",
  upload.single("avatar"),
  userInformationAPI.updateUserInfo
);

module.exports = router;
