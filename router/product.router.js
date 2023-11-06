const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });

const prController = require("../controllers/product.controller");

// Sản phẩm
router.get("/", prController.listProduct);
router.post("/", upload.single("image"), prController.addProduct);
router.put("/:idPro", upload.single("image"), prController.updateProduct);
router.delete("/:idPro", prController.deleteProduct);

// Loại sản phẩm
router.get("/type", prController.listTypeProduct);
router.post("/type", upload.single("image"), prController.addProduct);
router.put(
  "/type/:idType",
  upload.single("image"),
  prController.updateTypeProduct
);
router.delete("/type/:idType", prController.deleteTypeProduct);

//hiển thỉ danh sách Lưu
router.get("/favorite/:idUser", prController.listIdFavorite);
router.post("/favorite", prController.listPrFavorite);
router.put("/favorite/:idUser", prController.updateFavorite);
module.exports = router;
