const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });

const prController = require("../controllers/product.controller");

// Hiển thị danh sách sản phẩm
router.get("/", prController.listProduct);
// Thêm sản phẩm
router.post("/", upload.single("image"), prController.addProduct);
// Sửa sản phẩm
router.put("/:idPro", upload.single("image"), prController.updateProduct);
// Xóa sản phẩm
router.delete("/:idPro", prController.deleteProduct);

// Hiển thị danh sách loại sản phẩm
router.get("/type", prController.listTypeProduct);
// Thêm loại
router.post("/type", upload.single("image"), prController.addProduct);
// Sửa loại
router.put(
  "/type/:idType",
  upload.single("image"),
  prController.updateTypeProduct
);
// Xóa loại
router.delete("/type/:idType", prController.deleteTypeProduct);

module.exports = router;
