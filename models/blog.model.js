var db = require("./db");

// Tạo bảng blog
const blogSchema = new db.mongoose.Schema(
  {
    title: { type: String, require: true },
    image: { type: String, require: true },
    desc: { type: String, require: true },
  },
  {
    collection: "Blog",
    timestamps: true,
  }
);
const blog = db.mongoose.model("blog", blogSchema);

module.exports = { blog };
