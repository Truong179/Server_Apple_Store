var express = require("express");
var router = express.Router();
var multer = require("multer");
var objUpload = multer({ dest: "./tmp" });
// Trỏ tới controller
var blogController = require("../controller/blog.controller");

// => Hiển thị danh sách blog //
router.get("/", blogController.ListBlog);
// Thêm blog
router.post("/", objUpload.single("image"), blogController.AddBlog);
// Sửa blog
router.put("/:idBlog", objUpload.single("image"), blogController.UpdateBlog);
// Xóa blog
router.delete("/:idBlog", blogController.DeleteBlog);

module.exports = router;
