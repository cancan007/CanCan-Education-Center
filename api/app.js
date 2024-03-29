var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("dotenv").config();
var cors = require("cors");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../front_end/build"))); // to use React's static files

if (
  process.env.APP_ENVIRONMENT === "development" ||
  process.env.APP_ENVIRONMENT === "test"
) {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5000"], //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );
}

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
require("./startups/db")();
require("./startups/routes")(app);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front_end/build/index.html")); // to show React's front end in this server
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
