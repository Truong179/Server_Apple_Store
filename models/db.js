const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nguyenngoctruong1792003:uFmRH9qt7eUw6dnE@cluster0.al8wlns.mongodb.net/AppleStore?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Đã kết nối tới MongoDB");
  })
  .catch((error) => {
    console.error("Lỗi kết nối", error);
  });

module.exports = { mongoose };
