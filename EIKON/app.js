var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var logger = require("morgan");
var methodOverride = require("method-override");

// Routes
var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");
var usersRouter = require("./routes/users");
const usersApiRouter = require("./routes/api/users");
const productsApiRouter = require("./routes/api/products");
const authRoutes = require("./routes/api/auth");

//Middlewares
const userToLocalsMiddleware = require("./middlewares/userToLocalsMiddleware");
const rememberMiddleware = require("./middlewares/rememberMiddleware");

var app = express();

// CORS => Allow express back (port 3000 )to comunicates with Vite React Front (port 5173)
const cors = require("cors");
app.use(
 cors({
  origin: "http://localhost:5173", // tu frontend
  credentials: true,
 }),
);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// SESSIONS
app.set("trust proxy", 1);
app.use(
 session({
  secret: "Kp9A3KlRgEyyhzSxkbYmtFl0o1JSlUak",
  resave: false,
  saveUninitialized: false,
  saveUninitialized: false,
  cookie: {
   httpOnly: true,
   sameSite: "lax",
   secure: false,
  },
 }),
);
app.use(userToLocalsMiddleware);
app.use(rememberMiddleware);
// Make currentPath available to all views and define activeSection
app.use((req, res, next) => {
 res.locals.currentPath = req.path;
 if (req.path.startsWith("/products")) {
  res.locals.activeSection = "products";
 } else if (req.path.startsWith("/users")) {
  res.locals.activeSection = "users";
 } else if (req.path === "/") {
  res.locals.activeSection = "home";
 } else {
  res.locals.activeSection = "";
 }
 next();
});

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/auth", authRoutes);

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
