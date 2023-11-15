const fs = require("fs");
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

// Sản phẩm
exports.listProduct = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      let role = req.query.role;
      let typeProducts = await ProductModel.TypeProduct.find();
      let body = {};

      for (const typeProduct of typeProducts) {
        const typeName = typeProduct.name;
        if (role === "Shop") {
          // Nếu là shop, trả về toàn bộ danh sách sản phẩm
          body[typeName] = await ProductModel.Product.find({
            id_type: typeProduct._id,
          }).populate("id_type");
        } else {
          // Nếu là user, trả về danh sách không bị ẩn
          body[typeName] = await ProductModel.Product.find({
            id_type: typeProduct._id,
            hidden: false,
          }).populate("id_type");
        }
      }

      res.json({
        status: true,
        message: body,
      });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.addProduct = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);
      const newProduct = new ProductModel.Product({
        ...req.body,
        image: `/images/${req.file.originalname}`,
      });

      const savedProduct = await newProduct.save();
      res.json({ status: true, message: savedProduct });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log(req.body);
  if (req.method === "PUT") {
    const idPro = req.params.idPro;

    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);

      const updatedProduct = {
        ...req.body,
        image: `/images/${req.file.originalname}`,
      };

      const result = await ProductModel.Product.findByIdAndUpdate(
        idPro,
        updatedProduct
      );
      res.json({ status: true, message: result });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  if (req.method === "DELETE") {
    const idPro = req.params.idPro;

    try {
      const result = await ProductModel.Product.findByIdAndDelete(idPro);
      res.json({ status: true, message: result });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

// Loại sản phẩm
exports.listTypeProduct = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const types = await ProductModel.TypeProduct.find();
      res.json({
        status: true,
        message: types,
      });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.addTypeProduct = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);

      const newType = new ProductModel.TypeProduct({
        ...req.body,
        image: `/images/${req.file.originalname}`,
      });

      const savedType = await newType.save();
      res.json({ status: true, message: savedType });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.updateTypeProduct = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const types = await ProductModel.TypeProduct.find();
      res.json({
        status: true,
        message: types,
      });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.deleteTypeProduct = async (req, res, next) => {
  if (req.method === "DELETE") {
    const idType = req.params.idType;

    try {
      const result = await ProductModel.TypeProduct.findByIdAndDelete(idType);
      res.json({ status: true, message: result });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

// Sản phẩm yêu thích
exports.listIdFavorite = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const idUser = req.params.idUser;

      // Kiểm tra xem sản phẩm có trong danh sách ưa thích của người dùng hay không
      const user = await UserModel.User.findById(idUser);
      res.json({ status: true, message: user.favoriteProducts });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.listPrFavorite = async (req, res, next) => {
  if (req.method === "POST") {
    try {
      const productIds = req.body.productIds;

      const favoriteProducts = await ProductModel.Product.find({
        _id: { $in: productIds },
        hidden: false,
      });

      res.json({ status: true, message: favoriteProducts });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};

exports.updateFavorite = async (req, res, next) => {
  if (req.method === "PUT") {
    try {
      const idUser = req.params.idUser;
      const productId = req.body.productId;

      // Kiểm tra xem sản phẩm có trong danh sách ưa thích của người dùng hay không
      const user = await UserModel.User.findById(idUser);

      if (user.favoriteProducts.includes(productId)) {
        // Nếu có, xóa sản phẩm khỏi danh sách ưa thích
        user.favoriteProducts = user.favoriteProducts.filter(
          (id) => id != productId
        );
        console.log(user);
        res.json({ status: true, message: await user.save() });
      } else {
        // Nếu không, thêm sản phẩm vào danh sách ưa thích
        user.favoriteProducts.push(productId);
        res.json({ status: true, message: await user.save() });
      }
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: error.message });
    }
  }
};
