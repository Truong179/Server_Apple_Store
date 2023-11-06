const { mongoose } = require("./db");

// Tạo bảng blog
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    collection: "Blog",
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
