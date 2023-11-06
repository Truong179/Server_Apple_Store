var express = require("express");
var router = express.Router();
var multer = require("multer");
var objUpload = multer({ dest: "./tmp" });
// Trỏ tới controller
var prController = require("../controller/product.controller");

// => Hiển thị danh sách sản phẩm //
router.get("/", prController.ListProduct);
// Thêm sản phẩm
router.post("/", objUpload.single("image"), prController.AddProduct);
// Sửa sản phẩm
router.put("/:idPro", objUpload.single("image"), prController.UpdateProduct);
// Xóa sản phẩm
router.delete("/:idPro", prController.DeleteProduct);

// => Hiển thị danh sách loại sản phẩm //
router.get("/type", prController.ListTypeProduct);
// Thêm loại
router.post("/type", objUpload.single("image"), prController.AddTypeProduct);
// Sửa loại
router.put(
  "/type/:idType",
  objUpload.single("image"),
  prController.UpdateTypeProduct
);
// Xóa loại
router.delete("/type/:idType", prController.DeleteTypeProduct);

//hiển thỉ danh sách Lưu
router.post("/favorite/:userId/:productId",prController.FavoriteProduct)
router.post("/unfavorite/:userId/:productId",prController.UnFavoriteProduct)
module.exports = router;
