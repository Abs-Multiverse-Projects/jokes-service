const express = require("express");
const app = express();
const { Joke } = require("./db");
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
	try {
		if (!req.query.tags && !req.query.content) {
			const jokes = await Joke.findAll();
			res.send(jokes);
		} else {
			// TODO - filter the jokes by tags and content
			let jokes = [];
			if (req.query.tags) {
				const tags = req.query.tags;
				jokes = await Joke.findAll({
					where: { tags: { [Op.substring]: tags } },
				});
			} else {
				const content = req.query.content;
				jokes = await Joke.findAll({ where: { joke: { [Op.substring]: content }}})
			}
			res.send(jokes);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
