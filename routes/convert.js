const { default: axios } = require("axios");
const express = require("express");
const HttpError = require("../utils/HttpError");

const route = express.Router();

route.route("/:origin&:goal").get(async (req, res, next) => {
	const origin = req.params.origin;
	const goal = req.params.goal;
    console.log(origin, goal)
	let response;
	try {
		response = await axios(
			`https://free.currconv.com/api/v7/convert?q=${origin}_${goal},${goal}_${origin}&compact=ultra&apiKey=${process.env.CURRENCY_API_KEY}`
        );
	} catch (error) {
        const err = new HttpError("Something went wrong", 500);
        return next(err);
    }

    res.json(response.data);
});

module.exports = route;
