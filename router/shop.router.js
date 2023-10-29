var express = require("express");
var router = express.Router();
var multer = require("multer");
var objUpload = multer({ dest: "./tmp" });
// Trỏ tới controller
var prController = require("../controller/product.controller");

// => Hiển thị danh sách sản phẩm //
router.get("/product", prController.ListProduct);
// Thêm sản phẩm
router.post("/product", objUpload.single("image"), prController.AddProduct);
// Sửa sản phẩm
router.put(
  "/product/:idPro",
  objUpload.single("image"),
  prController.UpdateProduct
);
// Xóa sản phẩm
router.delete("/product/:idPro", prController.DeleteProduct);

// => Hiển thị danh sách loại sản phẩm //
router.get("/product/type", prController.ListTypeProduct);
// Thêm loại
router.post(
  "/product/type",
  objUpload.single("image"),
  prController.AddTypeProduct
);
// Sửa loại
router.put(
  "/product/type/:idType",
  objUpload.single("image"),
  prController.UpdateTypeProduct
);
// Xóa loại
router.delete("/product/type/:idType", prController.DeleteTypeProduct);

module.exports = router;
