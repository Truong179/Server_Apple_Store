var blog_model = require("../models/blog_model");
exports.listBlog = async (req, res, next) => {
  msg = "Danh sach blog";
  try {
    let list = await blog_model.blog.find();
    return res.status(200).json(list);
  } catch (error) {
    return res.status(204).json({ msg: error.message });
  }
};
