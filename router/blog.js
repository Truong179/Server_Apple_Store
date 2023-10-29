var express = require("express");
var router = express.Router();

var blog_api = require("../controller/blog_api");

router.get("/blog", blog_api.listBlog);

module.exports = router;
