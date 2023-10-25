var express = require("express");
var router = express.Router();

var blog_api_controller = require("../controller/blog_api");

router.get("/listBlog", blog_api_controller.listBlog);

module.exports = router;
