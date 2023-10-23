const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());


var apiRouter = require('./router/blog');
app.use('/api', apiRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
const port = 3000;
app.listen(port, () => {
  console.log(`server đang lắng nghe tại cổng ${port}`);
});
module.exports = app;
