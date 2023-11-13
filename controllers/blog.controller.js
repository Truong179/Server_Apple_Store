const fs = require("fs");
const BlogModel = require("../models/blog.model");

// Lấy danh sách blog
exports.listBlog = async (req, res, next) => {
  try {
    const blogs = await BlogModel.Blog.find();
    res.json({ status: true, message: blogs });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

// Thêm blog mới
exports.addBlog = async (req, res, next) => {
  try {
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    const newBlog = new BlogModel.Blog({
      ...req.body,
      image: `/images/${req.file.originalname}`,
    });

    const savedBlog = await newBlog.save();
    res.json({ status: true, message: savedBlog });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

// Cập nhật thông tin blog
exports.updateBlog = async (req, res, next) => {
  const idBlog = req.params.idBlog;
  try {
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    const updatedBlog = {
      ...req.body,
      image: `/images/${req.file.originalname}`,
    };

    const result = await BlogModel.Blog.findByIdAndUpdate(idBlog, updatedBlog);
    res.json({ status: true, message: result });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

// Xóa blog
exports.deleteBlog = async (req, res, next) => {
  const idBlog = req.params.idBlog;
  try {
    const result = await BlogModel.Blog.findByIdAndDelete(idBlog);
    res.json({ status: true, message: result });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};
