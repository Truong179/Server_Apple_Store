require("dotenv").config();

const express = require("express");
const path = require("path");
const createError = require("http-errors");
const userRouter = require("./router/user.router");
const informationRouter = require("./router/userInformation");
const productRouter = require("./router/product.router");
const blogRouter = require("./router/blog.router");

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

app.use("/user", userRouter);
app.use("/information", informationRouter);
app.use("/product", productRouter);
app.use("/blog", blogRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = environment === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(
    `Server is listening on http://localhost:${port}/ in ${environment} mode`
  );
});

module.exports = app;
