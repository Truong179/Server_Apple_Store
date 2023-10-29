const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());


var apiRouter = require('./router/blog');
var apiLogin = require('./router/user');
const apiInformations = require("./router/userInformation")
app.use('/api', apiRouter);
app.use('/user', apiLogin);
app.use('/information', apiInformations);
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
const port = 3000;
app.listen(port, () => {
  console.log(`server đang lắng nghe tại cổng ${port}`);
});
module.exports = app;
