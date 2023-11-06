var createError = require("http-errors");
var express = require("express");
var path = require("path");

var app = express();

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Middleware để phân tích dữ liệu URL-encoded
app.use(express.urlencoded({ extended: false }));

// Phục vụ các tệp tĩnh từ thư mục hiện tại
app.use(express.static(path.join(__dirname)));

// Sử dụng apiRouter để xử lý các route
// => API User
var apiLogin = require("./router/user");
app.use("/user", apiLogin);

// => API Information
var apiInformations = require("./router/userInformation");
app.use("/information", apiInformations);


var apiRouter = require('./router/blog');
var apiLogin = require('./router/user');
const apiInformations = require("./router/userInformation")
const address = require("./router/address")
app.use('/api', apiRouter);
app.use('/user', apiLogin);
app.use('/information', apiInformations);
app.use('/address', address);

// => API Product
var apiProduct = require("./router/product.router");
app.use("/product", apiProduct);

// => API Blog
var apiBlog = require("./router/blog.router");
app.use("/blog", apiBlog);

app.use(function (req, res, next) {
  next(createError(404));
});

// Middleware để xử lý lỗi
app.use(function (err, req, res, next) {
  // Đặt locals, chỉ cung cấp lỗi trong môi trường development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render trang lỗi
  res.status(err.status || 500);
  res.render("error");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên cổng http://localhost:${port}/`);
});

module.exports = app;
