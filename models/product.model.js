var db = require("./db");

// Tạo bảng product
const prSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: db.mongoose.Schema.Types.Number, required: true },
    description: { type: String, required: false },
    quantity: { type: db.mongoose.Schema.Types.Number, required: true },
    id_type: { type: db.mongoose.Schema.Types.ObjectId, ref: "typeProduct" },
    hidden: {
      type: db.mongoose.Schema.Types.Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "Product",
    timestamps: true,
  }
);
let product = db.mongoose.model("product", prSchema);

// Tạo bảng type product
const tpSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    collection: "TypeProduct",
    timestamps: true,
  }
);
let typeProduct = db.mongoose.model("typeProduct", tpSchema);

module.exports = { product, typeProduct };
