const fs = require("fs");
const ProductModel = require("../models/product.model");
const host = "192.168.0.110"; // Địa chỉ IP

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
        image: `http://${host}:3000/images/` + req.file.originalname,
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
  if (req.method === "PUT") {
    const idPro = req.params.idPro;

    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);

      const updatedProduct = {
        ...req.body,
        image: `http://${host}:3000/images/` + req.file.originalname,
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
        image: `http://${host}:3000/images/` + req.file.originalname,
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
  if (req.method === "PUT") {
    const idType = req.params.idType;

    try {
      fs.renameSync(req.file.path, "./images/" + req.file.originalname);

      const updatedType = {
        ...req.body,
        image: `http://${host}:3000/images/` + req.file.originalname,
      };

      const result = await ProductModel.TypeProduct.findByIdAndUpdate(
        idType,
        updatedType
      );
      res.json({ status: true, message: result });
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
