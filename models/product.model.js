const { mongoose } = require("./db");

// Tạo bảng product
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true },
    id_type: { type: mongoose.Schema.Types.ObjectId, ref: "TypeProduct" },
    hidden: { type: Boolean, required: false, default: false },
  },
  {
    collection: "Product",
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

// Tạo bảng type product
const typeProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    collection: "TypeProduct",
    timestamps: true,
  }
);
const TypeProduct = mongoose.model("TypeProduct", typeProductSchema);

module.exports = { Product, TypeProduct };
