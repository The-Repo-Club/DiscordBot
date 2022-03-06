var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const rateLimit = require("express-rate-limit");
const chalk = require("chalk");
const Box = require("cli-box");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var levelsRouter = require("./routes/levels");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 25, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: "Too many requests from this IP, please try again after 15 minutes",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

var app = express();
const port = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter, limiter);
app.use("/levels", levelsRouter, limiter);
app.use("/users", usersRouter, limiter);

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

app.listen(port, () => {
	const DatabaseBoxHeader = new Box(
		{
			w: 56,
			h: 1,
			stringify: false,
			marks: {
				nw: "╭",
				n: "─",
				ne: "╮",
				e: "│",
				se: "╯",
				s: "─",
				sw: "╰",
				w: "│",
			},
			hAlign: "middle",
		},
		"A P I   I N F O R M A T I O N"
	).stringify();

	const DatabaseBox = new Box(
		{
			w: 56,
			h: 1,
			stringify: false,
			marks: {
				nw: "╭",
				n: "─",
				ne: "╮",
				e: "│",
				se: "╯",
				s: "─",
				sw: "╰",
				w: "│",
			},
			hAlign: "middle",
		},
		`${chalk.bold.yellowBright(`API listening on port ${port}`)}`
	).stringify();

	console.log(chalk.bold.greenBright(DatabaseBoxHeader));
	console.log(chalk.bold.greenBright(DatabaseBox));
});

module.exports = app;
