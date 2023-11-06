var fs = require("fs");
var myMd = require("../models/blog.model");
var host = "192.168.0.110"; //Địa chỉ ip

// => Blog
exports.ListBlog = async (req, res, next) => {
  if (req.method == "GET") {
    try {
      // Lấy danh sách đối tượng blog
      res.json({
        status: true,
        message: await myMd.blog.find(),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.AddBlog = async (req, res, next) => {
  if (req.method == "POST") {
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng blog mới
    let objBlog = new myMd.blog();
    objBlog.title = req.body.title;
    objBlog.image = `http://${host}:3000/images/` + req.file.originalname;
    objBlog.desc = req.body.desc;

    try {
      // Lưu đối tượng blog vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await objBlog.save(),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.UpdateBlog = async (req, res, next) => {
  if (req.method == "PUT") {
    let idBlog = req.params.idBlog;
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng blog mới
    let objBlog = new myMd.blog();
    objBlog._id = idBlog;
    objBlog.title = req.body.title;
    objBlog.image = `http://${host}:3000/images/` + req.file.originalname;
    objBlog.desc = req.body.desc;

    try {
      // Cập nhật đối tượng blog vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.blog.findByIdAndUpdate(idBlog, objBlog),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.DeleteBlog = async (req, res, next) => {
  if (req.method == "DELETE") {
    let idBlog = req.params.idBlog;
    try {
      // Xóa đối tượng blog khỏi cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.blog.findByIdAndDelete(idBlog),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};
