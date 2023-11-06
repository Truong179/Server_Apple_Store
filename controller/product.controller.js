var fs = require("fs");
var myMd = require("../models/product.model");
var host = "192.168.0.110"; //Địa chỉ ip
var user_model = require("../models/user")
// => Sản phẩm
exports.ListProduct = async (req, res, next) => {
  if (req.method == "GET") {
    var typeProduct = await myMd.typeProduct.find();
    try {
      // Lấy danh sách đối tượng sản phẩm
      var body = {};
      for (let i = 0; i < typeProduct.length; i++) {
        let typeName = typeProduct[i].name;
        body[typeName] = await myMd.product
          .find({ id_type: typeProduct[i]._id })
          .populate("id_type");
      }
      res.json({
        status: true,
        message: body,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.AddProduct = async (req, res, next) => {
  if (req.method == "POST") {
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng loại sản phẩm mới
    let objPro = new myMd.product();
    objPro.name = req.body.name;
    objPro.image = `http://${host}:3000/images/` + req.file.originalname;
    objPro.price = req.body.price;
    objPro.hidden = true;
    objPro.description = req.body.description;
    objPro.quantity = req.body.quantity;
    objPro.id_type = req.body.id_type;

    try {
      // Lưu đối tượng loại sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await objPro.save(),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.UpdateProduct = async (req, res, next) => {
  if (req.method == "PUT") {
    let idPro = req.params.idPro;
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng loại sản phẩm mới
    let objPro = new myMd.product();
    objPro._id = idPro; // Thêm cho chức năng sửa
    objPro.name = req.body.name;
    objPro.image = `http://${host}:3000/images/` + req.file.originalname;
    objPro.price = req.body.price;
    objPro.hidden = req.body.hidden;
    objPro.description = req.body.description;
    objPro.quantity = req.body.quantity;
    objPro.id_type = req.body.id_type;

    try {
      // Cập nhật đối tượng loại sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.product.findByIdAndUpdate(idPro, objPro),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.DeleteProduct = async (req, res, next) => {
  if (req.method == "DELETE") {
    let idPro = req.params.idPro;
    try {
      // Xóa đối tượng sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.product.findByIdAndDelete(idPro),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

// => Loại sản phẩm
exports.ListTypeProduct = async (req, res, next) => {
  if (req.method == "GET") {
    try {
      // Lấy danh sách đối tượng loại sản phẩm
      res.json({
        status: true,
        message: await myMd.typeProduct.find(),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.AddTypeProduct = async (req, res, next) => {
  if (req.method == "POST") {
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng loại sản phẩm mới
    let objType = new myMd.typeProduct();
    objType.name = req.body.name;
    objType.image = `http://${host}:3000/images/` + req.file.originalname;

    try {
      // Lưu đối tượng loại sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await objType.save(),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.UpdateTypeProduct = async (req, res, next) => {
  if (req.method == "PUT") {
    let idType = req.params.idType;
    // Di chuyển và đổi tên file được tải lên
    fs.renameSync(req.file.path, "./images/" + req.file.originalname);

    // Tạo đối tượng loại sản phẩm mới
    let objType = new myMd.typeProduct();
    objType._id = idType; // Thêm cho chức năng sửa
    objType.name = req.body.name;
    objType.image = `http://${host}:3000/images/` + req.file.originalname;

    try {
      // Cập nhật đối tượng loại sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.typeProduct.findByIdAndUpdate(idType, objType),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.DeleteTypeProduct = async (req, res, next) => {
  if (req.method == "DELETE") {
    let idType = req.params.idType;
    try {
      // Xóa đối tượng loại sản phẩm vào cơ sở dữ liệu
      res.json({
        status: true,
        message: await myMd.typeProduct.findByIdAndDelete(idType),
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: error });
    }
  }
};

exports.FavoriteProduct = async (req,res) => {
  try {
    const userId = req.params.userId; // Giả sử bạn có thông tin người dùng trong req.user
    const productId = req.params.productId;

    // Kiểm tra xem sản phẩm đã có trong danh sách ưa thích của người dùng hay chưa
    const user = await user_model.user_model.findById(userId);
    if (user.favoriteProducts.includes(productId)) {
      return res.status(400).json({ error: "Sản phẩm đã được ưa thích" });
    }

    // Thêm sản phẩm vào danh sách ưa thích của người dùng
    user.favoriteProducts.push(productId);
    await user.save();

    res.status(200).json({ message: "Đã thêm sản phẩm vào danh sách ưa thích" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
}
exports.UnFavoriteProduct = async (req,res) => {
  try {
    const userId = req.params.userId; // Giả sử bạn có thông tin người dùng trong req.user
    const productId = req.params.productId;

    // Kiểm tra xem sản phẩm có trong danh sách ưa thích của người dùng hay không
    const user = await user_model.user_model.findById(userId);
    if (!user.favoriteProducts.includes(productId)) {
      return res.status(400).json({ error: "Sản phẩm không có trong danh sách ưa thích" });
    }

    // Xóa sản phẩm khỏi danh sách ưa thích của người dùng
    user.favoriteProducts = user.favoriteProducts.filter( function(id){
      return id !== productId;
    });
      
    console.log(user.favoriteProducts);
   
    await user.save();
    res.status(200).json({ message: "Đã xóa sản phẩm khỏi danh sách ưa thích" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
}


