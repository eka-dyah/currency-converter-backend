const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

const { json } = require("body-parser");

const currencies = require("./routes/currencies");
const convert = require("./routes/convert");
const HttpError = require("./utils/HttpError");

app.use(json());
app.use(logger("dev"));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	next();
});

app.use("/currencies", currencies);
app.use("/convert", convert);

app.use((req, res, next) => {
    const error = new HttpError("Something went wrong.", 500);
    throw error;
})

app.use((err, req, res, next) => {
	res.status(err.code || 500).json({
		error: err.message || "Something wrong.",
		code: err.code || 500,
	});
});

app.listen(process.env.PORT || 5000);
