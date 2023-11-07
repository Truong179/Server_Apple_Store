const express = require("express");
const router = express.Router();

const loginAPI = require("../controllers/user_api");
const orderAPI = require("../controllers/oder.controller");

// Login
router.post("/signup", loginAPI.Register);
router.post("/signIn", loginAPI.Login);
router.put("/:idUser", loginAPI.UpdatePass);

// Pay
router.get("/pay", orderAPI.listOrder);
router.post("/pay", orderAPI.addOrder);
router.put("/pay/:idOrder", orderAPI.updateOrder);

// Tổng hợp
router.get("/synthetic", orderAPI.getOrderStatistics);

module.exports = router;
