const { default: axios } = require("axios");
const express = require("express");
const HttpError = require("../utils/HttpError");

const route = express.Router();

route.route("/").get(async (req, res, next) => {
	let response;

	try {
		response = await axios(
			`https://free.currconv.com/api/v7/currencies?apiKey=${process.env.CURRENCY_API_KEY}`
		);
	} catch (error) {
        const err = new HttpError("Something error.", 500);
        return next(err);
    }

    res.json(response.data);
});

module.exports = route;
