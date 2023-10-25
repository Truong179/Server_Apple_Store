const { model } = require("mongoose");
var db = require("./db");

const blogSchema = new db.mongoose.Schema({
  title: { type: String, require: true },
  image: { type: String, require: true },
  desc: { type: String, require: true },
});
const blog = db.mongoose.model("blog", blogSchema);

module.exports = { blog };
