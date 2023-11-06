const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });

const blogController = require("../controllers/blog.controller");

// Blog
router.get("/", blogController.listBlog);
router.post("/", upload.single("image"), blogController.addBlog);
router.put("/:idBlog", upload.single("image"), blogController.updateBlog);
router.delete("/:idBlog", blogController.deleteBlog);

module.exports = router;
