const { mongoose } = require("./db");

// Bảng Order
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInformation" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Đang xử lý", "Đang vận chuyển", "Đã giao", "Đã hủy"],
      default: "Đang xử lý",
    },
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
