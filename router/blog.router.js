const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });

const blogController = require("../controllers/blog.controller");

// Hiển thị danh sách blog
router.get("/", blogController.listBlog);

// Thêm blog
router.post("/", upload.single("image"), blogController.addBlog);

// Sửa blog
router.put("/:idBlog", upload.single("image"), blogController.updateBlog);

// Xóa blog
router.delete("/:idBlog", blogController.deleteBlog);

module.exports = router;
